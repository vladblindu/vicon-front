// noinspection JSUnusedGlobalSymbols

import {find} from "$lib/http/simulate"
// @ts-ignore
import type {PageLoad} from "../$types"

export const load = async ({fetch}: PageLoad) =>  await find({fetch})