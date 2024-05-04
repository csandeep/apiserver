import { NextRequest, NextResponse } from 'next/server';
import { loadResults } from '@/app/utils/results';

/**
 * @swagger
 * /api/states:
 *   get:
 *     summary: Returns available states in the results json
 *     responses:
 *       200:
 *         description: ["New Jersey", "New York", "Pennsylvania"]
 */
export async function GET(req: NextRequest) {
  // treat all top level keys as states
  return NextResponse.json(Array.from(loadResults().keys()).sort());
}
