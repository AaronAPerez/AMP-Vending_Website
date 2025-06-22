import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Mock metrics data for development
    const mockMetrics = {
      totalRequests: 156,
      sentRequests: 123,
      openedRequests: 98,
      clickedRequests: 67,
      reviewsReceived: 41,
      averageRating: 4.7,
      responseRate: 33.3,
      openRate: 79.7,
      clickRate: 68.4,
      conversionRate: 61.2,
      timeFrame: 'month',
      periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      periodEnd: new Date()
    };

    const mockTrendData = [
      { date: new Date(), requests: 12, reviews: 4, averageRating: 4.8 },
      { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), requests: 15, reviews: 5, averageRating: 4.6 },
      { date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), requests: 18, reviews: 7, averageRating: 4.9 },
    ];

    res.status(200).json({
      success: true,
      data: {
        metrics: mockMetrics,
        trends: mockTrendData
      }
    });

  } catch (error) {
    console.error('Error fetching review metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch metrics'
    });
  }
}