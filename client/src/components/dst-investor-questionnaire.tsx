import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { calculateDstScore, DstAnswers } from '@/lib/calculateDstScore'

/* ---------- Question metadata ---------- */

const page1Questions = [
  {
    name: 'accredited',
    label: 'Are you already an accredited investor?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes, I meet the SEC definition' },
      { value: 'notSure', label: 'I\'m not sure - help me check' },
      { value: 'no', label: 'No' },
    ],
    required: true,
  },
  {
    name: 'saleStatus',
    label:
      'Which statement best describes your current property-sale status?',
    type: 'radio',
    options: [
      { value: 'active', label: 'Actively selling (listed / under contract)' },
      { value: 'lt6', label: 'Plan to sell in <= 6 months' },
      { value: 'lt12', label: 'Plan to sell in 6-12 months' },
      { value: 'ownNoSale', label: 'Own property, no sale planned' },
      { value: 'none', label: 'I don\'t own an investment property' },
    ],
    required: true,
  },
  {
    name: 'equityBracket',
    label:
      'Estimated equity you currently have in the investment property you are looking to sell',
    type: 'select',
    options: [
      { value: '100-249', label: '$100k – $249k' },
      { value: '250-499', label: '$250k – $499k' },
      { value: '500-999', label: '$500k – $999k' },
      { value: '1mPlus', label: '$1M +' },
    ],
    required: true,
  },
  {
    name: 'horizon',
    label: 'Preferred investment horizon',
    type: 'radio',
    options: [
      { value: '<3', label: '< 3 years' },
      { value: '3-5', label: '3-5 years' },
      { value: '5-10', label: '5-10 years' },
      { value: '10+', label: '10 years +' },
    ],
    required: true,
  },
  {
    name: 'returnNeed',
    label: 'Minimum annual cash-on-cash return you would find attractive',
    type: 'select',
    options: [
      { value: 'le4', label: '<= 4%' },
      { value: '5-6', label: '5-6%' },
      { value: '7-8', label: '7-8%' },
      { value: 'ge9', label: '>= 9%' },
    ],
    required: true,
  },
  {
    name: 'passiveImportance',
    label: 'How important is fully passive, no-landlord management to you?',
    type: 'likert', // 1-5
    required: true,
  },
] as const

const page2Questions = [
  {
    name: 'location',
    label: 'Property location (state or ZIP)',
    type: 'text',
  },
  {
    name: 'propertyType',
    label: 'What type of property are you selling?',
    type: 'select',
    options: [
      'Multifamily',
      'Industrial',
      'Retail',
      'Office',
      'Land',
      'Other',
    ].map((p) => ({ value: p.toLowerCase(), label: p })),
  },
  {
    name: 'mortgageBracket',
    label: 'Approximate mortgage balance still owed',
    type: 'select',
    options: [
      { value: 'free', label: 'Owned free & clear' },
      { value: 'lt25', label: '< 25% of value' },
      { value: '25to50', label: '25-50% of value' },
      { value: 'gt50', label: '> 50% of value' },
    ],
  },
  {
    name: 'prior1031',
    label: 'Have you completed a 1031 exchange before?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    name: 'qiReady',
    label: 'Do you already have a Qualified Intermediary (QI) selected?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    name: 'riskTolerance',
    label: 'How would you rate your overall risk tolerance?',
    type: 'likert',
  },
  {
    name: 'advisor',
    label: 'Are you working with a financial advisor or CPA?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    name: 'notes',
    label: 'Anything else we should know?',
    type: 'textarea',
  },
  {
    name: 'truthfulAcknowledgement',
    label: 'I hereby acknowledge that all the information provided is truthful and accurate to the best of my knowledge.',
    type: 'checkbox',
    required: true,
  },
] as const

/* ---------- Zod schema ---------- */

const Page1Schema = z.object({
  accredited: z.enum(['yes', 'notSure', 'no']),
  saleStatus: z.enum(['active', 'lt6', 'lt12', 'ownNoSale', 'none']),
  equityBracket: z.enum(['100-249', '250-499', '500-999', '1mPlus']),
  horizon: z.enum(['<3', '3-5', '5-10', '10+']),
  returnNeed: z.enum(['le4', '5-6', '7-8', 'ge9']),
  passiveImportance: z.coerce.number().min(1).max(5),
})

const Page2Schema = z.object({
  location: z.string().optional(),
  propertyType: z
    .enum([
      'multifamily',
      'industrial',
      'retail',
      'office',
      'land',
      'other',
    ])
    .optional(),
  mortgageBracket: z
    .enum(['free', 'lt25', '25to50', 'gt50'])
    .optional(),
  prior1031: z.enum(['yes', 'no']).optional(),
  qiReady: z.enum(['yes', 'no']).optional(),
  riskTolerance: z
    .coerce.number()
    .min(1)
    .max(5)
    .optional(),
  advisor: z.enum(['yes', 'no']).optional(),
  notes: z.string().optional(),
  truthfulAcknowledgement: z.literal(true, {
    errorMap: () => ({ message: "You must acknowledge that the information provided is truthful" })
  })
})

const WizardSchema = Page1Schema.merge(Page2Schema)

type WizardInputs = z.infer<typeof WizardSchema>

/* ---------- Component ---------- */

interface Props {
  onComplete: (data: {
    answers: DstAnswers
    score: number
    segment: 'high' | 'medium' | 'low' | 'notReady'
  }) => void
}

export const DSTInvestorQuestionnaire: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2>(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<WizardInputs>({
    resolver: zodResolver(WizardSchema),
    defaultValues: {
      passiveImportance: 3,
    },
  })

  const onSubmit: SubmitHandler<WizardInputs> = (data) => {
    const scoreResult = calculateDstScore(data as DstAnswers)
    onComplete({
      answers: data as DstAnswers,
      ...scoreResult,
    })
  }

  /* ---------- Render helpers ---------- */

  const renderField = (
    q:
      | (typeof page1Questions)[number]
      | (typeof page2Questions)[number],
  ) => {
    switch (q.type) {
      case 'radio':
        return (
          <div className="flex flex-col gap-2">
            <p className="font-medium">{q.label}</p>
            {q.options!.map((o) => (
              <label key={o.value} className="flex gap-2">
                <input
                  type="radio"
                  value={o.value}
                  {...register(q.name as keyof WizardInputs)}
                />
                {o.label}
              </label>
            ))}
            {errors[q.name as keyof WizardInputs] && (
              <p className="text-red-500 text-sm">
                {String(errors[q.name as keyof WizardInputs]?.message)}
              </p>
            )}
          </div>
        )
      case 'select':
        return (
          <div className="flex flex-col gap-2">
            <label className="font-medium">{q.label}</label>
            <select
              {...register(q.name as keyof WizardInputs)}
              className="border rounded p-2"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select…
              </option>
              {q.options!.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {errors[q.name as keyof WizardInputs] && (
              <p className="text-red-500 text-sm">
                {String(errors[q.name as keyof WizardInputs]?.message)}
              </p>
            )}
          </div>
        )
      case 'likert':
        return (
          <div className="flex flex-col gap-2">
            <label className="font-medium">{q.label}</label>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              {...register(q.name as keyof WizardInputs, {
                valueAsNumber: true,
              })}
            />
            <div className="flex justify-between text-xs">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        )
      case 'text':
        return (
          <div className="flex flex-col gap-2">
            <label className="font-medium">{q.label}</label>
            <input
              type="text"
              className="border rounded p-2"
              {...register(q.name as keyof WizardInputs)}
            />
          </div>
        )
      case 'textarea':
        return (
          <div className="flex flex-col gap-2">
            <label className="font-medium">{q.label}</label>
            <textarea
              rows={3}
              className="border rounded p-2"
              {...register(q.name as keyof WizardInputs)}
            />
          </div>
        )
      case 'checkbox':
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <input
                type="checkbox"
                className="mt-1"
                {...register(q.name as keyof WizardInputs)}
              />
              <label className="font-medium text-blue-800">{q.label}</label>
            </div>
            {errors[q.name as keyof WizardInputs] && (
              <p className="text-red-500 text-sm">
                {String(errors[q.name as keyof WizardInputs]?.message)}
              </p>
            )}
          </div>
        )
      default:
        return null
    }
  }

  /* ---------- JSX ---------- */

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 border rounded md:w-1/2"
      >
        <h3 className="text-lg font-semibold">
          {step === 1
            ? 'Step 1 / 2 - Required'
            : 'Step 2 / 2 - Fine-tune your match (optional)'}
        </h3>

        {(step === 1 ? page1Questions : page2Questions).map((q) => (
          <div key={q.name}>{renderField(q as any)}</div>
        ))}

        <div className="flex justify-between">
          {step === 2 && (
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          )}

          {step === 1 ? (
            <button
              type="button"
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {/* Right Panel - Accredited Investor Information */}
      <div className="md:w-1/2 bg-[#1A2B50] p-6 border rounded text-white">
        <h2 className="text-xl font-bold mb-4">What is an Accredited Investor?</h2>
        
        <p className="text-white/90 mb-6">
          An accredited investor is an individual or entity that is allowed to invest in securities that are not registered with financial authorities like the SEC.
        </p>
        
        <h3 className="font-semibold text-lg mb-3">Qualifying Criteria</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-white/10 p-2 rounded-lg flex-shrink-0">
              <span className="text-xl font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Income Qualification</h4>
              <p className="text-white/80 text-sm">
                Individual income exceeding $200,000 in each of the two most recent years, or joint income with a spouse exceeding $300,000.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="bg-white/10 p-2 rounded-lg flex-shrink-0">
              <span className="text-xl font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Net Worth Qualification</h4>
              <p className="text-white/80 text-sm">
                Net worth exceeding $1 million, either individually or jointly with a spouse (excluding primary residence).
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="bg-white/10 p-2 rounded-lg flex-shrink-0">
              <span className="text-xl font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Professional Qualification</h4>
              <p className="text-white/80 text-sm">
                Certain professional certifications, designations, or credentials recognized by the SEC.
              </p>
            </div>
          </div>
        </div>

        {step === 2 && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <h3 className="font-semibold text-lg mb-3">DST Benefits</h3>
            <ul className="space-y-3 text-white/80 text-sm list-disc pl-5">
              <li>Simplified property management with no landlord responsibilities</li>
              <li>Institutional-quality properties professionally managed</li>
              <li>Potential for monthly income distributions</li>
              <li>Tax advantages through 1031 exchanges</li>
              <li>Diversification across multiple properties or asset classes</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default DSTInvestorQuestionnaire