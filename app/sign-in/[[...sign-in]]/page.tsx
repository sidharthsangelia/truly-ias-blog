import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
         
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Truly IAS Admin
          </h1>
          <p className="text-muted-foreground">
            Sign in to access the admin dashboard
          </p>
        </div>

        
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-lg border border-border bg-card",
              headerTitle: "hidden",  
              headerSubtitle: "hidden",  
              socialButtonsBlockButton: "border-border hover:bg-muted",
              formButtonPrimary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
              footerAction: "hidden",  
            },
            layout: {
              socialButtonsPlacement: "top",
              showOptionalFields: false,
            }
          }}
          redirectUrl="/admin"
          signUpUrl="/sign-in"  
        />

        {/* Admin Notice */}
        <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Admin Access Only</p>
              <p>
                This area is restricted to authorized administrators. 
                If you need access, please contact your system administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}