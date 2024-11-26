import { Loader2 } from 'lucide-react'

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}