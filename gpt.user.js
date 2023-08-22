// ==UserScript==
// @name         ChatGPT、豆包 宽屏模式
// @namespace    https://greasyfork.org/
// @version      1.2.3
// @description  页面大于1080的屏幕撑开，显示更宽，看的更多，目前适用于ChatGPT、豆包（doubao）ai网站，后续会适配更多网站，欢迎提供网站，谢谢！
// @author       Await
// @match        *://chat.openai.com/
// @match        *://chat.openai.com/c/*
// @match        *://chat.openai.com/?*
// @match        *://poe.com/
// @match        *://poe.com/chat/*
// @match        *://www.doubao.com/chat/*
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";
  const desiredMinWidth = 1280;
  const transitionClass = "await-transition";
  const maxCount = 10;
  const hostname = window.location.hostname;
  const awaits = {
    await_key: 0,
    await_MaxWidth: "90rem",
    await_attributeKey: "await-attribute",
    await_btnId: "await-btn",
    await_btnShowTipId: "await-show-tip",
    await_cacheKey: "await-cache",
    await_cacheOpenStateKey: "await-cache-open-state",
    await_cacheCloseStateKey: "await-cache-close-state",
    await_styleId: "await-max-width",
    await_styleCommon: "await-max-width-common",

    //doubao
    await_doubao_aside: "aside",
    await_doubao_btnClass: "smlyI",
    await_doubao_promptFormClass: "_1agx",
    await_doubao_promptShellClass: "veIiy",
    await_doubao_promptContentClass: "cYhYx",
    //poe
    await_poe_aside: "aside",
    await_poe_formClass: "ChatMessageInputContainer_inputContainer__SQvPA",
    await_poe_promptBoxClass: "MainColumn_column__z1_q8",
    await_poe_promptAllMsgClass:
      ".ChatPageMain_container__1aaCT.ChatPageMain_narrowChatPage__fWwXM",

    //gpt
    await_GPT_nav: "nav",
    await_GPT_navDeleteClass: "absolute",
    await_GPT_form: "form",
    await_GPT_msgClass: ".xl\\:max-w-3xl",
    await_GPT_msgBox: "flex flex-col text-sm dark:bg-gray-800",
    await_GPT_cacheTheme: "theme",
    await_GPT_themeDark: "dark",
    await_GPT_themeLight: "light",
    await_GPT_bodyClass: "antialiased",
    await_GPT_inputClass: "grow",
  };

  !(function () {
    //判断是来自哪个网站 0等于doubao 1等于poe 2等于gpt
    if (hostname.indexOf("doubao") > -1) {
      awaits.await_key = 0;
      awaits.await_MaxWidth = "100%";
    } else if (hostname.indexOf("poe") > -1) {
      console.error("poe");
      awaits.await_key = 1;
      awaits.await_MaxWidth = "100%";
    } else if (hostname.indexOf("chat.openai") > -1) {
      awaits.await_key = 2;
      awaits.await_MaxWidth = "90rem";
    }
  })();
  function trss(ary) {
    throw new Error(ary);
  }
  cccc("ssss");
  //   try {
  //     var d = document.documentElement,
  //       c = d.classList;
  //     c.remove("light", "dark");
  //     var e = localStorage.getItem("theme");
  //     if ("system" === e || (!e && true)) {
  //       var t = "(prefers-color-scheme: dark)",
  //         m = window.matchMedia(t);
  //       if (m.media !== t || m.matches) {
  //         d.style.colorScheme = "dark";
  //         c.add("dark");
  //       } else {
  //         d.style.colorScheme = "light";
  //         c.add("light");
  //       }
  //     } else if (e) {
  //       c.add(e || "");
  //     }
  //     if (e === "light" || e === "dark") d.style.colorScheme = e;
  //   } catch (e) {}
  // })();

  function set_common_style_edit(e) {
    e.classList.add(awaits.await_styleId);
  }
  function set_common_style_remove(e) {
    e.classList.remove(awaits.await_styleId);
  }

  function setCache(key, value) {
    localStorage.setItem(key, value);
  }
  function getCache(key) {
    return localStorage.getItem(key);
  }

  function getByClass(className) {
    const func = function (name) {
      return document.getElementsByClassName(name);
    };
    return gets(func, className);
  }

  function getQuery(name) {
    const func = function (names) {
      return document.querySelector(names);
    };
    return gets(func, name);
  }

  function getById(id) {
    const func = function (ids) {
      return document.getElementById(ids);
    };
    return gets(func, id);
  }

  function gets(fun, name, count = 0) {
    const btn = fun(name);
    if (!btn) {
      if (count > maxCount) {
        return null; //防止死循环
      }
      setTimeout(function () {
        return gets(fun, name, count + 1);
      }, 1000);
    }
    return btn;
  }

  function set_style_remove(el) {
    if (!el.classList.contains(transitionClass)) {
      el.classList.add(transitionClass);
    }
    // el.style.transition = "max-width 1s";
    // setTimeout(function () {
    //   el.style.transition = "";
    // }, 1000);
    switch (awaits.await_key) {
      case 0:
      case 2:
        set_common_style_remove(el);
        break;
      case 1:
        break;
      default:
        break;
    }
  }

  function set_style_edit(el) {
    if (!el.classList.contains(transitionClass)) {
      el.classList.add(transitionClass);
    }
    // setTimeout(() => {
    //   el.classList.remove(transitionClass);
    // }, 1000);
    switch (awaits.await_key) {
      case 0:
      case 2:
        set_common_style_edit(el);
        break;
      case 1:
        break;

      default:
        break;
    }
  }

  function set_style() {
    const style = document.createElement("style");
    style.innerHTML = `
      .${awaits.await_styleCommon} {width: ${awaits.await_MaxWidth} !important;}
      .${awaits.await_styleId} {max-width: ${awaits.await_MaxWidth} !important;}
      .${transitionClass}{transition: max-width 1s ease-in-out !important;}
      `;
    document.head.appendChild(style);
  }

  function set_body_see_toKey() {
    switch (awaits.await_key) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        // set_gpt_body_s();
        break;
      default:
        break;
    }
  }

  function set_btn_add(tt = false, count = 0) {
    const promptTextarea = get_btn_toKey(awaits.await_key);
    if (!promptTextarea) {
      if (!tt) {
        return;
      } else {
        if (count > maxCount) {
          return;
        }
        setTimeout(function () {
          set_btn_add(tt, count + 1);
        }, 1000);
        return;
      }
    }
    if (tt && promptTextarea.hasAttribute(awaits.await_attributeKey)) {
      setTimeout(() => {
        set_btn_add(tt, count + 1);
      }, 100);
      return;
    }
    if (!promptTextarea.hasAttribute(awaits.await_attributeKey)) {
      //判断promptTextarea中的属性
      get_btn_prompt_toKey(promptTextarea);
      set_btn_promptContent_toKey();
      set_theme_toKey();
      run_info();
      promptTextarea.setAttribute(awaits.await_attributeKey, true);
    }
  }

  function get_btn_toKey(key) {
    if (key === 0) {
      return getByClass(awaits.await_doubao_btnClass)[0];
    } else if (key === 1) {
      return null;
    } else if (key === 2) {
      return getQuery(`.${awaits.await_GPT_inputClass}:not([class*=' '])`);
    }
  }

  function get_btn_prompt_toKey(e) {
    switch (awaits.await_key) {
      case 0:
        if (!getById(awaits.await_btnId)) {
          e.insertAdjacentHTML(
            "afterbegin",
            `<button id="${awaits.await_btnId}"      
          class="semi-button semi-button-primary semi-button-light 
          semi-button-with-icon semi-button-with-icon-only" 
          type="button" 
        </button>`
          );
        }
        break;
      case 1:
        break;
      case 2:
        if (!getById(awaits.await_btnId + "-" + awaits.await_GPT_cacheTheme)) {
          e.insertAdjacentHTML(
            "afterend",
            // `<div class="flex items-center md:items-end"><div style="opacity: 1;"><button id="${await_btnId}" class="btn relative  whitespace-nowrap -z-0 border-0 md:border ${await_btnId}"></button> </div></div>`
            `<div class="flex items-center md:items-end">
        <div style="opacity: 1;">
        <button id="${awaits.await_btnId}-${awaits.await_GPT_cacheTheme}" as="button" class="btn btn-neutral whitespace-nowrap -z-0 "></button> 
        </div>
        </div>`
          );
        }
        if (!getById(awaits.await_btnId)) {
          e.insertAdjacentHTML(
            "afterend",
            // `<div class="flex items-center md:items-end"><div style="opacity: 1;"><button id="${await_btnId}" class="btn relative  whitespace-nowrap -z-0 border-0 md:border ${await_btnId}"></button> </div></div>`
            `<div class="flex items-center md:items-end">
          <div style="opacity: 1;">
          <button id="${awaits.await_btnId}" as="button" class="text-gray-600 dark:text-gray-200 btn btn-neutral whitespace-nowrap -z-0 "></button> 
          </div>
          </div>`
          );
        }
        break;
      default:
        break;
    }
  }

  function set_btn_promptContent_toKey() {
    switch (awaits.await_key) {
      case 0:
        set_doubao_btn_msgEdit();
        break;
      case 1:
        break;
      case 2:
        set_gpt_btn_msgEdit();
        break;
      default:
        break;
    }
  }

  function set_theme_toKey() {
    switch (awaits.await_key) {
      case 1:
        break;
      case 2:
        set_gpt_theme_add();
        break;
      default:
        break;
    }
  }

  function set_btn_prompt_edit(el) {
    if (el && !el.hasAttribute(awaits.await_attributeKey)) {
      el.addEventListener("click", function () {
        setCache(
          awaits.await_cacheKey,
          getCache(awaits.await_cacheKey) === awaits.await_cacheOpenStateKey
            ? awaits.await_cacheCloseStateKey
            : awaits.await_cacheOpenStateKey
        );
        run_info(true);
        set_btn_promptContent_toKey();
      });
      el.setAttribute(awaits.await_attributeKey, true);
    }
  }

  function set_cache_add() {
    const cache = getCache(awaits.await_cacheKey);
    if (!cache) {
      setCache(awaits.await_cacheKey, true);
    }
  }

  function setStyle(cache, el) {
    if (cache === awaits.await_cacheOpenStateKey) {
      set_style_edit(el);
    } else {
      set_style_remove(el);
    }
  }

  function set_tip_show() {
    switch (awaits.await_key) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        set_gpt_show();
        break;
      default:
        break;
    }
  }

  function set_nav_click() {
    switch (awaits.await_key) {
      case 0:
        set_doubao_nav_click(true);
        break;
      case 1:
        console.log("1");
        set_poe_nav_click(true);
        break;
      case 2:
        set_gpt_nav_click();
        break;
      default:
        break;
    }
  }

  function get_form_toKey(operation) {
    switch (awaits.await_key) {
      case 0:
        set_doubao_form(operation);
        set_doubao_content();
        break;
      case 1:
        break;
      case 2:
        get_gpt_form();
        set_gpt_form_content();
        break;
      default:
        break;
    }
  }

  //#region poe

  function set_poe_nav_click(tt = false, count = 0) {
    const toggleButton = getQuery(awaits.await_poe_aside);
    console.log("set_poe_nav_click", toggleButton);
    if (!toggleButton) {
      if (!tt) return;
      else {
        if (count > maxCount) {
          return;
        }
        setTimeout(function () {
          set_poe_nav_click(tt, count + 1);
        }, 1000);
        return;
      }
    }
    if (tt && toggleButton.hasAttribute(awaits.await_attributeKey)) {
      setTimeout(function () {
        set_poe_nav_click(tt, count + 1);
      }, 1000);
      return;
    }
    if (!toggleButton.hasAttribute(awaits.await_attributeKey)) {
      toggleButton.addEventListener("click", function () {
        console.log("11111navClick");
        setTimeout(function () {
          run_all();
          run_info();
        }, 1000);
      });
      toggleButton.setAttribute(awaits.await_attributeKey, true);
    }
  }

  //#endregion

  //#region doubao

  function set_doubao_form(operation = false) {
    var elementForm = getByClass(awaits.await_doubao_promptFormClass)[0];
    if (!elementForm) {
      setTimeout(function () {
        set_doubao_form(operation);
      }, 1000);
      return;
    }
    if (!elementForm.hasAttribute(awaits.await_attributeKey) || operation) {
      const cache = getCache(awaits.await_cacheKey);
      setStyle(cache, elementForm);
      elementForm.setAttribute(awaits.await_attributeKey, true);
    }
  }

  function set_doubao_content() {
    var elementForm = getByClass(awaits.await_doubao_promptShellClass)[0];
    if (!elementForm || elementForm.length === 0) {
      setTimeout(function () {
        set_doubao_content();
      }, 1000);
      return;
    }
    if (elementForm.hasAttribute(awaits.await_attributeKey)) {
      return;
    }
    const cache = getCache(awaits.await_cacheKey);
    setStyle(cache, elementForm);
    elementForm
      .querySelectorAll("." + awaits.await_doubao_promptContentClass)
      .forEach(function (flexDiv) {
        setStyle(cache, flexDiv);
      });

    var observer = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        if (!document.contains(elementForm)) {
          observer.disconnect();
          return;
        }
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode instanceof Document || addedNode instanceof Element) {
            addedNode
              .querySelectorAll("." + awaits.await_doubao_promptContentClass)
              .forEach(function (node) {
                setStyle(cache, node);
              });
          }
        });
      });
    });
    var config = { childList: true, subtree: true };
    observer.observe(document.body, config);
  }

  function set_doubao_btn_msgEdit() {
    const cache2 = getCache(awaits.await_cacheKey);
    const btn = getById(awaits.await_btnId);
    btn.innerHTML = "";
    if (cache2 === awaits.await_cacheOpenStateKey) {
      btn.insertAdjacentHTML(
        "afterbegin",
        `<span class="semi-button-content">
        还原
        </span>`
      );
    } else {
      btn.insertAdjacentHTML(
        "afterbegin",
        `<span class="semi-button-content">
        撑开
        </span>`
      );
    }
    set_btn_prompt_edit(btn);
  }

  function set_doubao_nav_click(tt = false, count = 0) {
    const toggleButton = getQuery(awaits.await_doubao_aside);
    if (!toggleButton) {
      if (!tt) return;
      else {
        if (count > maxCount) {
          return;
        }
        setTimeout(function () {
          set_doubao_nav_click(tt, count + 1);
        }, 1000);
        return;
      }
    }
    if (tt && toggleButton.hasAttribute(awaits.await_attributeKey)) {
      setTimeout(function () {
        set_doubao_nav_click(tt, count + 1);
      }, 1000);
      return;
    }
    if (!toggleButton.hasAttribute(awaits.await_attributeKey)) {
      toggleButton.addEventListener("click", function () {
        setTimeout(function () {
          run_all();
          run_info();
        }, 1000);
      });
      toggleButton.setAttribute(awaits.await_attributeKey, true);
    }
  }

  //#endregion

  //#region  gpt

  function get_gpt_form() {
    var elementForm = getQuery(awaits.await_GPT_form);
    if (!elementForm || elementForm.length === 0) {
      setTimeout(function () {
        get_gpt_form();
      }, 1000);
      return;
    }
    const cache = getCache(awaits.await_cacheKey);
    if (elementForm.className.indexOf("xl:max-w-3xl") > -1) {
      setStyle(cache, elementForm);
    }
  }

  function set_gpt_form_content() {
    var parentElement = document.getElementsByClassName(
      awaits.await_GPT_msgBox
    )[0];
    if (!parentElement) {
      setTimeout(function () {
        set_gpt_form_content();
      }, 1000);
      return;
    }
    const cache = getCache(awaits.await_cacheKey);
    parentElement
      .querySelectorAll(awaits.await_GPT_msgClass)
      .forEach(function (flexDiv) {
        setStyle(cache, flexDiv);
      });
    var observer = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        if (!document.contains(parentElement)) {
          observer.disconnect();
          return;
        }
        mutation.addedNodes.forEach(function (addedNode) {
          if (addedNode instanceof Document || addedNode instanceof Element) {
            var flexDivList = addedNode.querySelectorAll(
              awaits.await_GPT_msgClass
            );
            flexDivList.forEach(function (flexDiv) {
              setStyle(cache, flexDiv);
            });
          }
        });
      });
    });
    var config = { childList: true, subtree: true };
    observer.observe(document.body, config);
  }
  function set_gpt_theme_add() {
    const cache = getCache(awaits.await_GPT_cacheTheme);
    const el = getById(awaits.await_btnId + "-" + awaits.await_GPT_cacheTheme);
    if (!el) return;
    el.innerHTML = "";
    if (cache !== awaits.await_GPT_themeLight) {
      el.insertAdjacentHTML(
        "afterbegin",
        `<div id="${awaits.await_btnId}-${awaits.await_GPT_themeDark}" 
        class="flex w-full gap-2 items-center justify-center">🌞</div>`
      );
    } else {
      el.insertAdjacentHTML(
        "afterbegin",
        `<div id="${awaits.await_btnId}-${awaits.await_GPT_themeLight}" 
      class="flex w-full gap-2 items-center justify-center">🌙</div>`
      );
    }
    set_gpt_textInformation_s(el);
    set_gpt_textInformation_s(
      getById(
        awaits.await_btnId + "-" + cache === awaits.await_GPT_themeDark
          ? awaits.await_GPT_themeDark
          : awaits.await_GPT_themeLight
      )
    );
  }

  function set_gpt_btn_msgEdit() {
    const cache2 = getCache(awaits.await_cacheKey);
    const btn = getById(awaits.await_btnId);
    btn.innerHTML = "";
    if (cache2 === awaits.await_cacheOpenStateKey) {
      btn.insertAdjacentHTML(
        "afterbegin",
        // `<div id="${awaits.await_btnId}-open"
        `<div class="flex w-full gap-2 items-center justify-center">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>还原</div>`
      );
    } else {
      btn.insertAdjacentHTML(
        "afterbegin",
        // `<div id="${awaits.await_btnId}-open"
        `<div class="flex w-full gap-2 items-center justify-center">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>撑开</div>`
      );
    }
    set_btn_prompt_edit(btn);
  }
  function set_gpt_textInformation_s(el) {
    if (el && !el.hasAttribute(awaits.await_attributeKey)) {
      el.addEventListener("click", function () {
        const cache = getCache(awaits.await_GPT_cacheTheme);
        //修改html中的style跟class
        const html = getQuery("html");
        const currentTheme =
          cache !== awaits.await_GPT_themeLight
            ? awaits.await_GPT_themeLight
            : awaits.await_GPT_themeDark;
        html.className = "";
        html.className = currentTheme;
        html.style.colorScheme = currentTheme;
        setCache(awaits.await_GPT_cacheTheme, currentTheme);
        set_gpt_theme_add();
      });
      el.setAttribute(awaits.await_attributeKey, true);
    }
  }

  function set_gpt_body_s() {
    const body = getQuery("." + awaits.await_GPT_bodyClass);
    if (!body) {
      return;
    }
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          const newStyle = body.getAttribute("style");
          if (!newStyle) {
            // set_btn_add(true);
          }
        }
      }
    });
    const config = { attributes: true, attributeFilter: ["style"] };
    observer.observe(body, config);
  }

  function set_gpt_show() {
    const toggleButton = getQuery(awaits.await_GPT_nav);
    if (!toggleButton) {
      return;
    }
    toggleButton.insertAdjacentHTML(
      "beforeend",
      `<div id="${awaits.await_btnShowTipId}" style="position:fixed;top:3rem;left:15rem;z-index:9999;background-color:rgba(0,0,0,0.5);color:#fff;padding:10px;border-radius:5px;">如果页面宽度未展开，请重新点击此树结构导航栏<br>或者直接<span style="color:red">点击我</span><br>提示内容十秒后自动消失</div>`
    );
    const btn = getById(awaits.await_btnShowTipId);
    if (!btn.hasAttribute(awaits.await_attributeKey)) {
      btn.addEventListener("click", function () {
        run_all();
      });
      setTimeout(function () {
        btn.remove();
      }, 10000);
      btn.setAttribute(awaits.await_attributeKey, true);
    }
  }
  function set_gpt_nav_click(operation = false, count = 0) {
    const toggleButton = getQuery(awaits.await_GPT_nav);
    if (!toggleButton) {
      if (!operation) {
        return;
      } else {
        if (count > maxCount) {
          return;
        }
        setTimeout(function () {
          set_gpt_nav_click(operation, count + 1);
        }, 1000);
        return;
      }
    }
    if (operation && toggleButton.hasAttribute(awaits.await_attributeKey)) {
      setTimeout(() => {
        set_gpt_nav_click(operation, count + 1);
      }, 100);
      return;
    }
    if (!toggleButton.hasAttribute(awaits.await_attributeKey)) {
      //监听元素的变化
      const observer = new MutationObserver((mutationsList, observer) => {
        mutationsList.forEach((mutation) => {
          if (!document.contains(toggleButton)) {
            observer.disconnect();
            return;
          }
          if (mutation.type === "childList") {
            mutation.removedNodes.forEach((removedNode) => {
              if (
                removedNode.className &&
                removedNode.className.indexOf(awaits.await_GPT_navDeleteClass) >
                  -1
              ) {
                run_all(true);
                set_gpt_nav_click(true);
              }
            });
          }
        });
      });
      observer.observe(document.body, {
        attributes: true,
        childList: true,
      });

      toggleButton.addEventListener("click", function () {
        setTimeout(function () {
          run_all();
          set_gpt_nav_click();
        }, 1000);
      });
      toggleButton.setAttribute(awaits.await_attributeKey, true);
    }
  }

  //#endregion

  function run_all(operation) {
    set_btn_add(operation);
    set_theme_toKey();
  }
  function run_info(operation) {
    get_form_toKey(operation);
  }
  window.addEventListener("resize", run_all);
  window.onload = function () {
    if (window.innerWidth < desiredMinWidth) {
      console.log("页面宽度小于1280，不执行脚本");
      return;
    }
    set_cache_add();
    set_style();
    // set_tip_show();
    set_nav_click();
    set_body_see_toKey();
    setTimeout(function () {
      run_all();
    }, 2000);
  };
})();
