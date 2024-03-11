import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" required type="password" />
          </div>
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}

