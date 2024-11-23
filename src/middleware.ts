import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/login'
  }
})

export const config = {
  matcher: [
    '/affiliates',
    '/affiliates/:path*',
    '/payment-types',
    '/dashboard',
    '/info'
  ]
}
