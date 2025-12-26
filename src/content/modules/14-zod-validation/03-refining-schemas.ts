import type { Lesson } from '@/types'

export const lesson: Lesson = {
  id: '03-refining-schemas',
  slug: 'refining-schemas',
  title: 'Refining Schemas',
  description: 'Learn how to add custom validation logic and error messages to your Zod schemas.',
  order: 3,
  estimatedMinutes: 10,
  difficulty: 'intermediate',
  xpReward: 60,
  prerequisites: ['02-object-schemas'],
  tags: ['validation', 'zod', 'advanced'],
  keyConcepts: [
    {
      id: 'zod-refine',
      term: '.refine()',
      definition: 'A method that allows you to add custom validation logic that can\'t be expressed with standard Zod methods.',
      syntax: 'schema.refine((data) => condition, { message: "error" })',
      whyItMatters: 'Refine is essential for complex rules, like checking if a password matches a confirmation field or validating that a date is in the future.',
    },
    {
      id: 'zod-custom-error',
      term: 'Custom Error Messages',
      definition: 'Zod allowing you to override default error messages for any validation rule.',
      syntax: 'z.string().min(5, { message: "Too short!" })',
      whyItMatters: 'Clear error messages are vital for a good user experience.',
    },
  ],
  steps: [
    {
      id: 'step-1-custom-messages',
      order: 1,
      type: 'instruction',
      title: 'Custom Error Messages',
      content: `# Clearer Errors

By default, Zod provides technical error messages. You can customize them to be more user-friendly.`,
      codeExample: {
        code: `const PasswordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(32, { message: "Password is too long" });`,
        language: 'typescript',
      },
    },
    {
      id: 'step-2-refine',
      order: 2,
      type: 'instruction',
      title: 'Custom Logic with refine',
      content: `# The refine Method

Use \`.refine()\` when you need to check multiple fields or perform a check that Zod doesn't have a built-in method for.`,
      codeExample: {
        code: `const RegistrationSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Point the error to this field
});`,
        language: 'typescript',
      },
    },
    {
      id: 'step-3-exercise-1',
      order: 3,
      type: 'code-exercise',
      title: 'Range Validator',
      instructions: `1. Create an object schema named \`rangeSchema\` with two fields: \`min\` (number) and \`max\` (number).
2. Add a refinement (\`.refine()\`) that ensures \`max\` is greater than or equal to \`min\`.
3. Provide the error message: \`"Max must be greater than or equal to min"\`.`,
      starterCode: `import { z } from "zod";

// Define your rangeSchema here
`,
      solutionCode: `import { z } from "zod";

export const rangeSchema = z.object({
  min: z.number(),
  max: z.number(),
}).refine((data) => data.max >= data.min, {
  message: "Max must be greater than or equal to min",
});`,
      testCases: [
        {
          id: 'test-1',
          description: 'Should accept valid range',
          testCode: `rangeSchema.parse({ min: 10, max: 20 });`,
        },
        {
          id: 'test-2',
          description: 'Should reject invalid range',
          testCode: `try { rangeSchema.parse({ min: 20, max: 10 }); throw new Error('Fail'); } catch (e) { if (e.message.indexOf('Max must be greater than or equal to min') === -1) throw e; }`,
        },
      ],
      hints: [
        'Use `z.object({ ... })` followed by `.refine(...)`',
        'Inside refine, compare `data.max` and `data.min`',
      ],
      aiHintPrompt: 'The user is learning how to perform cross-field validation with Zod refine.',
    },
  ],
}
