import { NextResponse, type NextRequest } from 'next/server';

// This is a demo implementation - replace with actual Stripe integration
export async function POST(request: NextRequest) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { priceId } = await request.json();

        // In a real implementation, you would:
        // 1. Initialize Stripe with your secret key
        // 2. Create a checkout session
        // 3. Return the session URL

        /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/support/live-chat?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/support`,
    })

    return NextResponse.json({ url: session.url })
    */

        // Demo response
        return NextResponse.json({
            url: '/support/live-chat',
            message: 'Demo mode - redirecting to live chat',
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
}
