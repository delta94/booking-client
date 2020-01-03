import puppeteer from "puppeteer";
import muResult from "../utils/mutationResultSafty";
import { ExecutionResult } from "graphql";
import { WindowSize } from "../types/enum";
import { TLogin } from "../pages/bookingHost/Login/__test__/Login.test";

export const S = 1000;
export const urlBase = "http://localhost:3000";

export const takeShot = async (
  mode: "mb" | "pc",
  name: string,
  propPrefix?: string,
  propModifier?: string
) => {
  const tempPrefix = propPrefix ? `${propPrefix}__` : "";
  const modifier = propModifier ? `--${propModifier}` : "";
  const fileName = `${tempPrefix}${name}${modifier}`;

  await page.screenshot({
    path: `testScreenShot/${mode}/${fileName}.jpeg`,
    type: "jpeg",
    fullPage: true
  });
  return;
};

export const TgetElement = async (selecter: string) => {
  const el = await page.$(selecter);
  if (!el) throw Error(selecter + "is not exist");
  return el;
};

export async function TgetAttr<T>(
  puppetEl: puppeteer.ElementHandle<Element>,
  attr: string
): Promise<T> {
  return (await (await puppetEl.getProperty("attr")).jsonValue()) as any;
}

export const Tselect = async (selecter: string, propSelectIndex?: number) => {
  const selectIndex = propSelectIndex || 1;
  await page.click(selecter);
  await page.waitForSelector(`${selecter} .react-select__option`);
  await page.click(
    `${selecter} .react-select__option:nth-child(${selectIndex})`
  );
};

export const Tupload = async (uploaderSelecter: string, fileUrl: string) => {
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click(uploaderSelecter) // some button that triggers file selection
  ]);
  await fileChooser.accept([fileUrl]);
  await expectOkFromGraphql();
};

export const Ttype = async (selecter: string, text: string) => {
  await page.click(selecter);
  await page.type(selecter, text);
};

export const TTextWait = async (text: string, selecter?: string | "body") => {
  await page.waitForFunction(
    `document.querySelector(${selecter}).innerText.includes(${text})`
  );
};

export const TwaitClick = async (selecter: string) => {
  await page.waitForSelector(selecter);
  await page.click(selecter);
};

// ---------------------------------------------------

export const expectOkFromGraphql = async () => {
  const response = await page.waitForResponse(isResponseFromServer, {
    timeout: 10 * S
  });

  expect(response.ok() === true);
  return response;
};

//
export const toastCheck = async (queryName?: string) => {
  if (queryName) {
    await page.waitForSelector(`.${queryName}-ok`, {
      timeout: 60 * S
    });
  } else {
    await page.waitForSelector(`.Toastify__toast--success`, {
      timeout: 60 * S
    });
  }
};

// This is So broken (seem can not read File...)
// There is no way!!! to get body-specific  result
// Some Query will Stuck at here escape this util fnc Don't trust it
// Find another way to check
export const responseResultCheck = async (query: string, key?: string) => {
  console.info("responseResultCheck");
  const response = await expectOkFromGraphql();
  const resultValidate: ExecutionResult<any> = (await response.json()) as any;
  console.log("resultValidate");
  expect(muResult(resultValidate, query) === true);
  if (key) return muResult(resultValidate, query, key);
};

//  I MUST!!! FIND WAY AT HERE !!!!!!!!
export const isResponseFromServer = (response: puppeteer.Response) => {
  return response
    .request()
    .url()
    .includes("graphql");
};

export const getDefaultViewport = (windowSize: WindowSize) => {
  switch (windowSize) {
    case WindowSize.DESKTOPHD:
      const width = WindowSize.DESKTOPHD;
      return {
        width,
        height: (width * 9) / 16
      };
    default:
      return undefined;
  }
};

interface TestLogin {
  email?: string;
  tokenLogin?: boolean;
  token?: string;
}

export const testReady = async (goto?: string, login?: TestLogin) => {
  await context.overridePermissions(urlBase, ["geolocation"]);
  await page.goto(urlBase);

  if (login) {
    if (false) {
      // TODO
      // await page.evaluate(() => {
      //   localStorage.setItem("token", "example-token");
      // });
      // await page.reload();
    } else {
      await TLogin(login.email || "crawl123@naver.com");
      await page.waitForNavigation({
        waitUntil: "domcontentloaded"
      });
      await page.waitForSelector("#dashboard");
    }
  }

  if (goto) {
    await page.goto(goto);
    await page.waitFor(1000);
  }
};

test.skip("skip", () => {});
