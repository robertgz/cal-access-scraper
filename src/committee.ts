import { Page, chromium, Locator } from 'playwright';

export const getGeneralInfo = async (committeeID: string, session: string) => {}

export const getContributionsReceived = async (committeeID: string, session: string) => {}

// https://cal-access.sos.ca.gov/Campaign/Committees/DetailContributionsMadeExcel.aspx?id=1287702&session=2021
export const getContributionsMade = async (committeeID: string, session: string) => {}

// https://cal-access.sos.ca.gov/Campaign/Committees/DetailExpendituresMadeExcel.aspx?id=1287702&session=2021
export const getExpendituresMade = async (committeeID: string, session: string) => {}

export const getLateContributionsReceived = async (committeeID: string, session: string) => {}

export const getLateContributionsMade = async (committeeID: string, session: string) => {}

export const getLateIndependentExpenditures = async (committeeID: string, session: string) => {}
