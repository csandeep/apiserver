import { NextRequest, NextResponse } from 'next/server';
import { getResults } from '@/app/utils/results';

/**
 * @swagger
 *  /api/results:
 *    post:
 *      summary: Get results by county and overall winner given a state name.
 *      description: Get results by county and overall winner given a state name.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              state: string
 *            example:
 *              state: New Jersey
 *      responses:
 *        '200':
 *          description: OK
 */
export async function POST(req: NextRequest) {
  const { state } = await req.json();

  try {
    let { results, overall, parties } = getResults(state);
    return NextResponse.json({
      results,
      overall,
      parties: Array.from(parties.values()),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
