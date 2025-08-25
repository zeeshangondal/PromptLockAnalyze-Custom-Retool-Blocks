var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// react-global:react
var require_react = __commonJS({
  "react-global:react"(exports, module) {
    module.exports = window.ccc_support_React;
  }
});

// src/index.tsx
var import_react = __toESM(require_react());

// tryretool-custom-component-collections-global:@tryretool/custom-component-support
var { Retool } = window.ccc_support_RetoolCustomComponenCollections;

// react-jsx-runtime-global:react/jsx-runtime
var { Fragment, jsxs, jsx, default: default2 } = window.ccc_support_ReactJSXRuntime;

// src/index.tsx
var PromptLockAnalyze = () => {
  const [apiKey] = Retool.useStateString({
    name: "apiKey",
    initialValue: "",
    inspector: "text",
    label: "API Key"
  });
  const [text] = Retool.useStateString({
    name: "text",
    initialValue: "",
    inspector: "text",
    label: "Prompt"
  });
  const [complianceFrameworksStr] = Retool.useStateString({
    name: "compliance_frameworks",
    initialValue: "[]",
    inspector: "text",
    label: "Compliance Frameworks"
  });
  const [actionOnHighRisk] = Retool.useStateString({
    name: "action_on_high_risk",
    initialValue: "",
    inspector: "text",
    label: "Action on High Risk"
  });
  const [cleanText, setCleanText] = Retool.useStateString({
    name: "redacted_prompt",
    initialValue: "",
    inspector: "hidden",
    label: "Redacted Prompt"
  });
  const [riskScore, setRiskScore] = Retool.useStateNumber({
    name: "risk_score",
    initialValue: 0,
    inspector: "hidden",
    label: "risk_score"
  });
  const [violations, setViolations] = Retool.useStateString({
    name: "violations",
    initialValue: "[]",
    inspector: "hidden",
    label: "violations"
  });
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    if (!apiKey || !text || !actionOnHighRisk)
      return;
    setLoading(true);
    setError("");
    let frameworks = [];
    try {
      frameworks = JSON.parse(complianceFrameworksStr);
    } catch {
      frameworks = complianceFrameworksStr.split(",").map((s) => s.trim()).filter(Boolean);
    }
    const requestBody = {
      text,
      compliance_frameworks: frameworks,
      action_on_high_risk: actionOnHighRisk
    };
    fetch("https://promptshield-g1cz.onrender.com/v1/analyze", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    }).then(async (res) => {
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (errData?.detail)
          throw new Error(errData.detail);
        throw new Error(`HTTP error ${res.status}`);
      }
      return res.json();
    }).then((data) => {
      setCleanText(data.clean_text ?? "");
      setRiskScore(data.risk_score ?? 0);
      setViolations(JSON.stringify(data.violations ?? []));
    }).catch((err) => {
      setError(err.message || "Unknown error");
      setCleanText("");
      setRiskScore(0);
      setViolations("[]");
    }).finally(() => setLoading(false));
  }, [apiKey, text, complianceFrameworksStr, actionOnHighRisk]);
  return /* @__PURE__ */ jsxs("div", { style: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: "24px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    border: "1px solid #e5e7eb"
  }, children: [
    /* @__PURE__ */ jsxs("h3", { style: {
      margin: "0 0 24px 0",
      fontSize: "24px",
      fontWeight: "700",
      color: "#111827",
      borderBottom: "2px solid #3b82f6",
      paddingBottom: "12px",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        display: "inline-block",
        width: "8px",
        height: "8px",
        backgroundColor: "#3b82f6",
        borderRadius: "50%"
      } }),
      "PromptLock /v1/analyz"
    ] }),
    loading && /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "16px",
      backgroundColor: "#eff6ff",
      border: "1px solid #bfdbfe",
      borderRadius: "8px",
      marginBottom: "20px"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        width: "20px",
        height: "20px",
        border: "2px solid #3b82f6",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      } }),
      /* @__PURE__ */ jsx("p", { style: { margin: "0", color: "#1e40af", fontWeight: "500" }, children: "Analyzing text..." })
    ] }),
    !loading && error && /* @__PURE__ */ jsx("div", { style: {
      padding: "16px",
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: "8px",
      marginBottom: "20px"
    }, children: /* @__PURE__ */ jsxs("p", { style: {
      margin: "0",
      color: "#dc2626",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: "18px" }, children: "\u26A0\uFE0F" }),
      "Error: ",
      error
    ] }) }),
    !loading && !error && /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "20px" }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "20px",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        border: "1px solid #e2e8f0"
      }, children: [
        /* @__PURE__ */ jsx("p", { style: {
          margin: "0 0 8px 0",
          fontWeight: "600",
          color: "#374151",
          fontSize: "14px",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }, children: "Redacted Prompt" }),
        /* @__PURE__ */ jsx("p", { style: {
          margin: "0",
          color: "#1f2937",
          lineHeight: "1.6",
          fontSize: "15px",
          padding: "12px",
          backgroundColor: "#ffffff",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          minHeight: "40px",
          wordBreak: "break-word"
        }, children: cleanText || /* @__PURE__ */ jsx("span", { style: { color: "#9ca3af", fontStyle: "italic" }, children: "No redacted text available" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "20px",
        backgroundColor: "#f0fdf4",
        borderRadius: "8px",
        border: "1px solid #bbf7d0"
      }, children: [
        /* @__PURE__ */ jsx("p", { style: {
          margin: "0 0 8px 0",
          fontWeight: "600",
          color: "#374151",
          fontSize: "14px",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }, children: "Risk Score" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: "28px",
            fontWeight: "700",
            color: riskScore > 0.7 ? "#dc2626" : riskScore > 0.4 ? "#d97706" : "#059669"
          }, children: riskScore }),
          /* @__PURE__ */ jsx("div", { style: {
            flex: 1,
            height: "8px",
            backgroundColor: "#e5e7eb",
            borderRadius: "4px",
            overflow: "hidden"
          }, children: /* @__PURE__ */ jsx("div", { style: {
            width: `${Math.min(riskScore * 100, 100)}%`,
            height: "100%",
            backgroundColor: riskScore > 0.7 ? "#dc2626" : riskScore > 0.4 ? "#d97706" : "#059669",
            borderRadius: "4px",
            transition: "width 0.3s ease"
          } }) }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: "12px",
            fontWeight: "500",
            color: "#6b7280",
            textTransform: "uppercase"
          }, children: riskScore > 0.7 ? "HIGH" : riskScore > 0.4 ? "MEDIUM" : "LOW" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "20px",
        backgroundColor: "#fefbff",
        borderRadius: "8px",
        border: "1px solid #e9d5ff"
      }, children: [
        /* @__PURE__ */ jsx("p", { style: {
          margin: "0 0 12px 0",
          fontWeight: "600",
          color: "#374151",
          fontSize: "14px",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }, children: "Violations" }),
        /* @__PURE__ */ jsx("pre", { style: {
          backgroundColor: "#ffffff",
          padding: "16px",
          margin: "0",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "13px",
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          color: "#374151",
          lineHeight: "1.5",
          overflow: "auto",
          maxHeight: "300px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }, children: (() => {
          if (typeof violations === "string") {
            try {
              return JSON.stringify(JSON.parse(violations), null, 2);
            } catch {
              return violations;
            }
          } else {
            return JSON.stringify(violations, null, 2);
          }
        })() })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: {
      __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
    } })
  ] });
};
export {
  PromptLockAnalyze
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhY3QtZ2xvYmFsOnJlYWN0IiwgIi4uL3NyYy9pbmRleC50c3giLCAidHJ5cmV0b29sLWN1c3RvbS1jb21wb25lbnQtY29sbGVjdGlvbnMtZ2xvYmFsOkB0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0IiwgInJlYWN0LWpzeC1ydW50aW1lLWdsb2JhbDpyZWFjdC9qc3gtcnVudGltZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3Q7XG4gICAgICAgICIsICJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFJldG9vbCB9IGZyb20gJ0B0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0J1xuXG5leHBvcnQgY29uc3QgUHJvbXB0TG9ja0FuYWx5emU6IEZDID0gKCkgPT4ge1xuICBjb25zdCBbYXBpS2V5XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XG4gICAgbmFtZTogJ2FwaUtleScsXG4gICAgaW5pdGlhbFZhbHVlOiAnJyxcbiAgICBpbnNwZWN0b3I6ICd0ZXh0JyxcbiAgICBsYWJlbDogJ0FQSSBLZXknXG4gIH0pXG5cbiAgY29uc3QgW3RleHRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcbiAgICBuYW1lOiAndGV4dCcsXG4gICAgaW5pdGlhbFZhbHVlOiAnJyxcbiAgICBpbnNwZWN0b3I6ICd0ZXh0JyxcbiAgICBsYWJlbDogJ1Byb21wdCdcbiAgfSlcblxuICBjb25zdCBbY29tcGxpYW5jZUZyYW1ld29ya3NTdHJdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcbiAgICBuYW1lOiAnY29tcGxpYW5jZV9mcmFtZXdvcmtzJyxcbiAgICBpbml0aWFsVmFsdWU6ICdbXScsXG4gICAgaW5zcGVjdG9yOiAndGV4dCcsXG4gICAgbGFiZWw6ICdDb21wbGlhbmNlIEZyYW1ld29ya3MnXG4gIH0pXG5cbiAgY29uc3QgW2FjdGlvbk9uSGlnaFJpc2tdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcbiAgICBuYW1lOiAnYWN0aW9uX29uX2hpZ2hfcmlzaycsXG4gICAgaW5pdGlhbFZhbHVlOiAnJyxcbiAgICBpbnNwZWN0b3I6ICd0ZXh0JyxcbiAgICBsYWJlbDogJ0FjdGlvbiBvbiBIaWdoIFJpc2snXG4gIH0pXG5cbiAgY29uc3QgW2NsZWFuVGV4dCwgc2V0Q2xlYW5UZXh0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XG4gICAgbmFtZTogJ3JlZGFjdGVkX3Byb21wdCcsXG4gICAgaW5pdGlhbFZhbHVlOiAnJyxcbiAgICBpbnNwZWN0b3I6ICdoaWRkZW4nLFxuICAgIGxhYmVsOiAnUmVkYWN0ZWQgUHJvbXB0J1xuICB9KVxuXG4gIGNvbnN0IFtyaXNrU2NvcmUsIHNldFJpc2tTY29yZV0gPSBSZXRvb2wudXNlU3RhdGVOdW1iZXIoe1xuICAgIG5hbWU6ICdyaXNrX3Njb3JlJyxcbiAgICBpbml0aWFsVmFsdWU6IDAsXG4gICAgaW5zcGVjdG9yOiAnaGlkZGVuJyxcbiAgICBsYWJlbDogJ3Jpc2tfc2NvcmUnXG4gIH0pXG5cbiAgY29uc3QgW3Zpb2xhdGlvbnMsIHNldFZpb2xhdGlvbnNdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcbiAgICBuYW1lOiAndmlvbGF0aW9ucycsXG4gICAgaW5pdGlhbFZhbHVlOiAnW10nLFxuICAgIGluc3BlY3RvcjogJ2hpZGRlbicsXG4gICAgbGFiZWw6ICd2aW9sYXRpb25zJ1xuICB9KVxuXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFhcGlLZXkgfHwgIXRleHQgfHwgIWFjdGlvbk9uSGlnaFJpc2spIHJldHVyblxuXG4gICAgc2V0TG9hZGluZyh0cnVlKVxuICAgIHNldEVycm9yKCcnKVxuXG4gICAgbGV0IGZyYW1ld29ya3M6IHN0cmluZ1tdID0gW11cbiAgICB0cnkge1xuICAgICAgZnJhbWV3b3JrcyA9IEpTT04ucGFyc2UoY29tcGxpYW5jZUZyYW1ld29ya3NTdHIpXG4gICAgfSBjYXRjaCB7XG4gICAgICBmcmFtZXdvcmtzID0gY29tcGxpYW5jZUZyYW1ld29ya3NTdHJcbiAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcCgocykgPT4gcy50cmltKCkpXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0Qm9keSA9IHtcbiAgICAgIHRleHQsXG4gICAgICBjb21wbGlhbmNlX2ZyYW1ld29ya3M6IGZyYW1ld29ya3MsXG4gICAgICBhY3Rpb25fb25faGlnaF9yaXNrOiBhY3Rpb25PbkhpZ2hSaXNrXG4gICAgfVxuXG4gICAgZmV0Y2goJ2h0dHBzOi8vcHJvbXB0c2hpZWxkLWcxY3oub25yZW5kZXIuY29tL3YxL2FuYWx5emUnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YXBpS2V5fWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keSlcbiAgICB9KVxuICAgICAgLnRoZW4oYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICAgIGNvbnN0IGVyckRhdGEgPSBhd2FpdCByZXMuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpXG4gICAgICAgICAgaWYgKGVyckRhdGE/LmRldGFpbCkgdGhyb3cgbmV3IEVycm9yKGVyckRhdGEuZGV0YWlsKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciAke3Jlcy5zdGF0dXN9YClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHNldENsZWFuVGV4dChkYXRhLmNsZWFuX3RleHQgPz8gJycpXG4gICAgICAgIHNldFJpc2tTY29yZSgoZGF0YS5yaXNrX3Njb3JlID8/IDApKVxuICAgICAgICBzZXRWaW9sYXRpb25zKEpTT04uc3RyaW5naWZ5KGRhdGEudmlvbGF0aW9ucyA/PyBbXSkpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgc2V0RXJyb3IoZXJyLm1lc3NhZ2UgfHwgJ1Vua25vd24gZXJyb3InKVxuICAgICAgICBzZXRDbGVhblRleHQoJycpXG4gICAgICAgIHNldFJpc2tTY29yZSgwKVxuICAgICAgICBzZXRWaW9sYXRpb25zKCdbXScpXG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4gc2V0TG9hZGluZyhmYWxzZSkpXG4gIH0sIFthcGlLZXksIHRleHQsIGNvbXBsaWFuY2VGcmFtZXdvcmtzU3RyLCBhY3Rpb25PbkhpZ2hSaXNrXSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgXG4gICAgICBmb250RmFtaWx5OiAnLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgc2Fucy1zZXJpZicsIFxuICAgICAgcGFkZGluZzogJzI0cHgnLCBcbiAgICAgIG1heFdpZHRoOiAnODAwcHgnLCBcbiAgICAgIG1hcmdpbjogJzAgYXV0bycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgYm94U2hhZG93OiAnMCA0cHggNnB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMDYpJyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTVlN2ViJ1xuICAgIH19PlxuICAgICAgPGgzIHN0eWxlPXt7XG4gICAgICAgIG1hcmdpbjogJzAgMCAyNHB4IDAnLFxuICAgICAgICBmb250U2l6ZTogJzI0cHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnNzAwJyxcbiAgICAgICAgY29sb3I6ICcjMTExODI3JyxcbiAgICAgICAgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICMzYjgyZjYnLFxuICAgICAgICBwYWRkaW5nQm90dG9tOiAnMTJweCcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgIGdhcDogJzhweCdcbiAgICAgIH19PlxuICAgICAgICA8c3BhbiBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgIHdpZHRoOiAnOHB4JyxcbiAgICAgICAgICBoZWlnaHQ6ICc4cHgnLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMzYjgyZjYnLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJSdcbiAgICAgICAgfX0+PC9zcGFuPlxuICAgICAgICBQcm9tcHRMb2NrIC92MS9hbmFseXpcbiAgICAgIDwvaDM+XG5cbiAgICAgIHtsb2FkaW5nICYmIChcbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICBnYXA6ICcxMnB4JyxcbiAgICAgICAgICBwYWRkaW5nOiAnMTZweCcsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2VmZjZmZicsXG4gICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNiZmRiZmUnLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnMjBweCdcbiAgICAgICAgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6ICcyMHB4JyxcbiAgICAgICAgICAgIGhlaWdodDogJzIwcHgnLFxuICAgICAgICAgICAgYm9yZGVyOiAnMnB4IHNvbGlkICMzYjgyZjYnLFxuICAgICAgICAgICAgYm9yZGVyVG9wOiAnMnB4IHNvbGlkIHRyYW5zcGFyZW50JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBhbmltYXRpb246ICdzcGluIDFzIGxpbmVhciBpbmZpbml0ZSdcbiAgICAgICAgICB9fT48L2Rpdj5cbiAgICAgICAgICA8cCBzdHlsZT17eyBtYXJnaW46ICcwJywgY29sb3I6ICcjMWU0MGFmJywgZm9udFdlaWdodDogJzUwMCcgfX0+QW5hbHl6aW5nIHRleHQuLi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgeyFsb2FkaW5nICYmIGVycm9yICYmIChcbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIHBhZGRpbmc6ICcxNnB4JyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmVmMmYyJyxcbiAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2ZlY2FjYScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICBtYXJnaW5Cb3R0b206ICcyMHB4J1xuICAgICAgICB9fT5cbiAgICAgICAgICA8cCBzdHlsZT17eyBcbiAgICAgICAgICAgIG1hcmdpbjogJzAnLCBcbiAgICAgICAgICAgIGNvbG9yOiAnI2RjMjYyNicsIFxuICAgICAgICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGdhcDogJzhweCdcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMThweCcgfX0+XHUyNkEwXHVGRTBGPC9zcGFuPlxuICAgICAgICAgICAgRXJyb3I6IHtlcnJvcn1cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgeyFsb2FkaW5nICYmICFlcnJvciAmJiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMjBweCcgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgcGFkZGluZzogJzIwcHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2Y4ZmFmYycsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMmU4ZjAnXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8cCBzdHlsZT17eyBcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCAwIDhweCAwJywgXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLCBcbiAgICAgICAgICAgICAgY29sb3I6ICcjMzc0MTUxJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsXG4gICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgUmVkYWN0ZWQgUHJvbXB0XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cCBzdHlsZT17eyBcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCcsIFxuICAgICAgICAgICAgICBjb2xvcjogJyMxZjI5MzcnLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMS42JyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxNXB4JyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkMWQ1ZGInLFxuICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICc0MHB4JyxcbiAgICAgICAgICAgICAgd29yZEJyZWFrOiAnYnJlYWstd29yZCdcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICB7Y2xlYW5UZXh0IHx8IDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAnIzljYTNhZicsIGZvbnRTdHlsZTogJ2l0YWxpYycgfX0+Tm8gcmVkYWN0ZWQgdGV4dCBhdmFpbGFibGU8L3NwYW4+fVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgcGFkZGluZzogJzIwcHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2YwZmRmNCcsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNiYmY3ZDAnXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8cCBzdHlsZT17eyBcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCAwIDhweCAwJywgXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLCBcbiAgICAgICAgICAgICAgY29sb3I6ICcjMzc0MTUxJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsXG4gICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgUmlzayBTY29yZVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICcxMnB4JyB9fT5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcyOHB4JywgXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJzcwMCcsXG4gICAgICAgICAgICAgICAgY29sb3I6IHJpc2tTY29yZSA+IDAuNyA/ICcjZGMyNjI2JyA6IHJpc2tTY29yZSA+IDAuNCA/ICcjZDk3NzA2JyA6ICcjMDU5NjY5J1xuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICB7cmlza1Njb3JlfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBmbGV4OiAxLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzhweCcsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2U1ZTdlYicsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke01hdGgubWluKHJpc2tTY29yZSAqIDEwMCwgMTAwKX0lYCxcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiByaXNrU2NvcmUgPiAwLjcgPyAnI2RjMjYyNicgOiByaXNrU2NvcmUgPiAwLjQgPyAnI2Q5NzcwNicgOiAnIzA1OTY2OScsXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIDAuM3MgZWFzZSdcbiAgICAgICAgICAgICAgICB9fT48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJyM2YjcyODAnLFxuICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG4gICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIHtyaXNrU2NvcmUgPiAwLjcgPyAnSElHSCcgOiByaXNrU2NvcmUgPiAwLjQgPyAnTUVESVVNJyA6ICdMT1cnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIHBhZGRpbmc6ICcyMHB4JyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZWZiZmYnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTlkNWZmJ1xuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPHAgc3R5bGU9e3sgXG4gICAgICAgICAgICAgIG1hcmdpbjogJzAgMCAxMnB4IDAnLCBcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsIFxuICAgICAgICAgICAgICBjb2xvcjogJyMzNzQxNTEnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxuICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyxcbiAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJzAuMDVlbSdcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICBWaW9sYXRpb25zXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cHJlIHN0eWxlPXt7IFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJywgXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcxNnB4JyxcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCcsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZDFkNWRiJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxM3B4JyxcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogJ3VpLW1vbm9zcGFjZSwgU0ZNb25vLVJlZ3VsYXIsIFwiU0YgTW9ub1wiLCBDb25zb2xhcywgXCJMaWJlcmF0aW9uIE1vbm9cIiwgTWVubG8sIG1vbm9zcGFjZScsXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzM3NDE1MScsXG4gICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxLjUnLFxuICAgICAgICAgICAgICBvdmVyZmxvdzogJ2F1dG8nLFxuICAgICAgICAgICAgICBtYXhIZWlnaHQ6ICczMDBweCcsXG4gICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsXG4gICAgICAgICAgICAgIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZpb2xhdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2UodmlvbGF0aW9ucyksIG51bGwsIDIpXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2aW9sYXRpb25zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2aW9sYXRpb25zLCBudWxsLCAyKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgIF9faHRtbDogYFxuICAgICAgICAgIEBrZXlmcmFtZXMgc3BpbiB7XG4gICAgICAgICAgICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgICAgfX0gLz5cbiAgICA8L2Rpdj5cbiAgKVxufSIsICJcbiAgICAgICAgICBleHBvcnQgY29uc3QgeyBSZXRvb2wgfSA9IHdpbmRvdy5jY2Nfc3VwcG9ydF9SZXRvb2xDdXN0b21Db21wb25lbkNvbGxlY3Rpb25zO1xuICAgICAgICAiLCAiXG4gICAgICAgICAgZXhwb3J0IGNvbnN0IHsgRnJhZ21lbnQsIGpzeHMsIGpzeCwgZGVmYXVsdCB9ID0gd2luZG93LmNjY19zdXBwb3J0X1JlYWN0SlNYUnVudGltZTtcbiAgICAgICAgIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNVLFdBQU8sVUFBVSxPQUFPO0FBQUE7QUFBQTs7O0FDRGxDLG1CQUErQzs7O0FDQzlCLElBQU0sRUFBRSxPQUFPLElBQUksT0FBTzs7O0FDQTFCLElBQU0sRUFBRSxVQUFVLE1BQU0sS0FBSyxTQUFBQSxTQUFRLElBQUksT0FBTzs7O0FGRTFELElBQU0sb0JBQXdCLE1BQU07QUFDekMsUUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLGVBQWU7QUFBQSxJQUNyQyxNQUFNO0FBQUEsSUFDTixjQUFjO0FB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
