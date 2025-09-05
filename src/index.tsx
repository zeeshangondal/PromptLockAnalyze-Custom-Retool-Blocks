import React, { FC, useState } from 'react'
import { Retool } from '@tryretool/custom-component-support'

export const PromptLockAnalyze: FC = () => {
  const [apiKey, setApiKey] = Retool.useStateString({
    name: 'apiKey',
    initialValue: '',
    inspector: 'text',
    label: 'API Key'
  })

  const [text, setText] = Retool.useStateString({
    name: 'text',
    initialValue: '',
    inspector: 'text',
    label: 'Prompt'
  })

  const [complianceFrameworksStr, setComplianceFrameworksStr] = Retool.useStateString({
    name: 'compliance_frameworks',
    initialValue: '[]',
    inspector: 'text',
    label: 'Compliance Frameworks'
  })

  const [actionOnHighRisk, setActionOnHighRisk] = Retool.useStateString({
    name: 'action_on_high_risk',
    initialValue: '',
    inspector: 'text',
    label: 'Action on High Risk'
  })

  const [cleanText, setCleanText] = Retool.useStateString({
    name: 'redacted_prompt',
    initialValue: '',
    inspector: 'hidden',
    label: 'Redacted Prompt'
  })

  const [riskScore, setRiskScore] = Retool.useStateNumber({
    name: 'risk_score',
    initialValue: 0,
    inspector: 'hidden',
    label: 'risk_score'
  })

  const [violations, setViolations] = Retool.useStateString({
    name: 'violations',
    initialValue: '[]',
    inspector: 'hidden',
    label: 'violations'
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    setLoading(true)
    setError('')

    let frameworks: string[] = []
    try {
      frameworks = JSON.parse(complianceFrameworksStr)
    } catch {
      frameworks = complianceFrameworksStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    }

    const requestBody = {
      text,
      compliance_frameworks: frameworks,
      action_on_high_risk: actionOnHighRisk
    }

    fetch('https://promptshield-g1cz.onrender.com/v1/analyze', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          if (errData?.detail) throw new Error(errData.detail)
          throw new Error(`HTTP error ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setCleanText(data.clean_text ?? '')
        setRiskScore(data.risk_score ?? 0)
        setViolations(JSON.stringify(data.violations ?? []))
      })
      .catch((err) => {
        setError(err.message || 'Unknown error')
        setCleanText('')
        setRiskScore(0)
        setViolations('[]')
      })
      .finally(() => setLoading(false))
  }

  const isAnalyzeDisabled = !apiKey || !text || !complianceFrameworksStr || !actionOnHighRisk

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', 
      padding: '24px', 
      maxWidth: '800px', 
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{
        margin: '0 0 24px 0',
        fontSize: '24px',
        fontWeight: '700',
        color: '#111827',
        borderBottom: '2px solid #3b82f6',
        paddingBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%'
        }}></span>
        PromptLock /v1/analyz
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
        <div>
          <label style={{ fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
            API Key
          </label>
          <input 
            type="text" 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)} 
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }} 
            placeholder="Enter your API key"
          />
        </div>

        <div>
          <label style={{ fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
            Prompt
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              minHeight: '60px'
            }}
            placeholder="Type the prompt to analyze"
          />
        </div>

        <div>
          <label style={{ fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
            Compliance Frameworks
          </label>
          <input
            type="text"
            value={complianceFrameworksStr}
            onChange={(e) => setComplianceFrameworksStr(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }}
            placeholder='e.g. ["HIPAA", "GDPR", "PCI"]'
          />
        </div>

        <div>
          <label style={{ fontWeight: 600, color: '#374151', marginBottom: '4px', display: 'block' }}>
            Action on High Risk
          </label>
          <input
            type="text"
            value={actionOnHighRisk}
            onChange={(e) => setActionOnHighRisk(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db'
            }}
            placeholder="From: flag, block, redact, score"
          />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <button
          disabled={isAnalyzeDisabled}
          onClick={handleAnalyze}
          style={{
            padding: '10px 16px',
            backgroundColor: isAnalyzeDisabled ? '#9ca3af' : '#3b82f6',
            color: '#ffffff',
            borderRadius: '6px',
            border: 'none',
            cursor: isAnalyzeDisabled ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          Analyze
        </button>
      </div>

      {loading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #3b82f6',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ margin: '0', color: '#1e40af', fontWeight: '500' }}>Analyzing text...</p>
        </div>
      )}

      {!loading && error && (
        <div style={{
          padding: '16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ 
            margin: '0', 
            color: '#dc2626', 
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '18px' }}>⚠️</span>
            Error: {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Redacted Prompt
            </p>
            <p style={{ 
              margin: '0', 
              color: '#1f2937',
              lineHeight: '1.6',
              fontSize: '15px',
              padding: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              minHeight: '40px',
              wordBreak: 'break-word'
            }}>
              {cleanText || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>No redacted text available</span>}
            </p>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #bbf7d0'
          }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Risk Score
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ 
                fontSize: '28px', 
                fontWeight: '700',
                color: riskScore > 0.7 ? '#dc2626' : riskScore > 0.4 ? '#d97706' : '#059669'
              }}>
                {riskScore}
              </span>
              <div style={{
                flex: 1,
                height: '8px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(riskScore * 100, 100)}%`,
                  height: '100%',
                  backgroundColor: riskScore > 0.7 ? '#dc2626' : riskScore > 0.4 ? '#d97706' : '#059669',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#6b7280',
                textTransform: 'uppercase'
              }}>
                {riskScore > 0.7 ? 'HIGH' : riskScore > 0.4 ? 'MEDIUM' : 'LOW'}
              </span>
            </div>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: '#fefbff',
            borderRadius: '8px',
            border: '1px solid #e9d5ff'
          }}>
            <p style={{ 
              margin: '0 0 12px 0', 
              fontWeight: '600', 
              color: '#374151',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Violations
            </p>
            <pre style={{ 
              backgroundColor: '#ffffff', 
              padding: '16px',
              margin: '0',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '13px',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              color: '#374151',
              lineHeight: '1.5',
              overflow: 'auto',
              maxHeight: '300px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {
                (() => {
                  if (typeof violations === 'string') {
                    try {
                      return JSON.stringify(JSON.parse(violations), null, 2)
                    } catch {
                      return violations
                    }
                  } else {
                    return JSON.stringify(violations, null, 2)
                  }
                })()
              }
            </pre>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  )
}