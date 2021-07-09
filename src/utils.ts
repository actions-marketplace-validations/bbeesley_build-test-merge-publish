import { getInput, setSecret } from '@actions/core';
import { exec, ExecOptions } from '@actions/exec';
import * as github from '@actions/github';
import { PullRequestEvent } from '@octokit/webhooks-definitions/schema';

import { MergeMethod, PullRequest } from './@types';
import { EnableAutoMerge } from './generated/graphql';

export async function loggedExec(
  commandLine: string,
  args?: string[],
  options: ExecOptions = {}
): Promise<void> {
  let errors = '';
  const res = await exec(commandLine, args, {
    env: { ...(process.env as Record<string, string>) },
    listeners: {
      stderr: (data: Buffer) => {
        errors += data.toString();
      },
    },
    ...options,
  });
  if (res > 0) throw new Error(`Failed to run operation ${errors}`);
}

export async function npmAuth(): Promise<void> {
  const privateRegistry = getInput('private-npm-registry');
  const privateRegistryToken = getInput('private-npm-token');
  const npmToken = process.env.NPM_TOKEN;
  if (npmToken || (privateRegistryToken && privateRegistry)) {
    if (privateRegistryToken && privateRegistry) {
      setSecret(privateRegistryToken);
      console.log('authenticating with registry', privateRegistry);
      await exec(
        `/bin/bash -c "echo //${privateRegistry}/:_authToken=${privateRegistryToken} >> .npmrc"`
      );
    }
    if (npmToken && npmToken.length > 0) {
      await exec(
        `/bin/bash -c "echo //registry.npmjs.org/:_authToken=${npmToken} >> .npmrc"`
      );
    }
    await exec('cp', [`.npmrc`, `${process.env.HOME}/.npmrc`]);
  }
}

function getMergeMethod(): MergeMethod {
  const mergeMethod = getInput('merge-method');
  const result = Object.values(MergeMethod).find(
    (m) => m.toLowerCase() === mergeMethod.toLowerCase()
  );
  return result ?? MergeMethod.Rebase;
}

export async function getPR(): Promise<PullRequest> {
  const requestPayload = github.context.payload as PullRequestEvent;
  const ok = github.getOctokit(
    process.env.GITHUB_TOKEN ?? (process.env.GH_TOKEN as string)
  );
  const res = await ok.rest.pulls.get({
    ...github.context.repo,
    pull_number: requestPayload.pull_request.number,
  });
  return res.data;
}

export async function approvePR() {
  const ok = github.getOctokit(
    process.env.GITHUB_TOKEN ?? (process.env.GH_TOKEN as string)
  );
  const requestPayload = github.context.payload as PullRequestEvent;
  await ok.rest.pulls.createReview({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: requestPayload.pull_request.number,
    event: 'APPROVE',
  });
}

export async function mergePR() {
  const ok = github.getOctokit(
    process.env.GITHUB_TOKEN ?? (process.env.GH_TOKEN as string)
  );
  const query = EnableAutoMerge.loc!.source!.body;
  const pullRequest = await getPR();
  const res = await ok.graphql({
    query,
    pullRequestId: pullRequest.node_id,
    mergeMethod: getMergeMethod(),
  });
  console.log('automerge response', JSON.stringify(res));
}

export function isDependabot(): boolean {
  const dependabot = github.context.actor === 'dependabot[bot]';
  if (dependabot) console.log('detected dependabot actor');
  return dependabot;
}

export function isDependabotPRTarget(): boolean {
  const dependabot =
    github.context.eventName === 'pull_request_target' && isDependabot();
  if (dependabot) console.log('detected dependabot PR');
  return dependabot;
}
