import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignIn , useUser} from "@clerk/clerk-react"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isLoaded: signInLoaded , signIn, setActive } = useSignIn()
  const {isLoaded: userLoaded, isSignedIn } = useUser()
  const navigate = useNavigate()
    useEffect(() => {
      if (userLoaded && isSignedIn) {
        navigate("/students", { replace: true })
      }
    }, [userLoaded, isSignedIn, navigate])

   if (!signInLoaded) {
    return <div>Loading...</div>
  }


  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!signIn || !setActive) {
      console.error("Clerk is not initialized")
      return
    }
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const signInResult = await signIn.create({strategy: "password" , identifier: email , password: password})
    if(signInResult.status === "complete") {
      setActive({ session: signInResult.createdSessionId })
     
    }

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                 
                </div>
                <Input id="password" type="password" name="password"required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
               
              </div>
            </div>
          
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
