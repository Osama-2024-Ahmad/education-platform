import { Button } from '@/components/ui/button'
import { Check, CreditCard, Zap } from 'lucide-react'
import React from 'react'

export default function Billing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "/month",
            description: "Perfect for getting started with AI learning.",
            features: [
                "Generate up to 3 courses",
                "Basic AI course customization",
                "Access to community support",
                "Standard processing speed"
            ],
            current: true,
            buttonText: "Current Plan",
            buttonVariant: "outline"
        },
        {
            name: "Pro",
            price: "$19",
            period: "/month",
            description: "Unlock the full potential of AI education.",
            features: [
                "Unlimited course generation",
                "Advanced AI models (Gemini 1.5 Pro)",
                "Priority processing & generation",
                "Download course materials",
                "Premium support"
            ],
            current: false,
            buttonText: "Coming Soon",
            buttonVariant: "default",
            disabled: true
        }
    ]

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Choose the plan that fits your learning journey. Upgrade at any time to unlock more features.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative p-8 rounded-2xl border ${plan.current ? 'border-border bg-card shadow-sm' : 'border-primary/50 bg-card shadow-xl shadow-primary/10'} flex flex-col`}
                    >
                        {!plan.current && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                <Zap className="w-4 h-4" /> Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                            <p className="text-muted-foreground mt-2">{plan.description}</p>
                        </div>

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                            <span className="text-muted-foreground">{plan.period}</span>
                        </div>

                        <div className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-sm text-foreground/80">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            className={`w-full ${!plan.current && 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white border-0'}`}
                            variant={plan.buttonVariant}
                            disabled={plan.current || plan.disabled}
                        >
                            {plan.current ? (
                                <span className="flex items-center gap-2"><Check className="w-4 h-4" /> {plan.buttonText}</span>
                            ) : (
                                <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> {plan.buttonText}</span>
                            )}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
