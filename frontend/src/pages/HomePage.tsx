import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  GraduationCap,
  Users,
  FileText,
  Upload,
  Search,
  Plus,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  UserPlus,
  FileCheck,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">DiplomaManager</h1>
                <p className="text-sm text-muted-foreground">Document Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students, diplomas, or documents..." className="pl-10" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Diplomas</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">-8% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents Uploaded</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,456</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-balance">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Manage your diploma and student records efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-start space-y-2">
                    <div className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span className="font-medium">Add New Diploma</span>
                    </div>
                    <span className="text-sm text-primary-foreground/80 text-left">
                      Create and register a new diploma record
                    </span>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent">
                    <div className="flex items-center space-x-2">
                      <UserPlus className="h-4 w-4" />
                      <span className="font-medium">Add New Student</span>
                    </div>
                    <span className="text-sm text-muted-foreground text-left">
                      Register a new student in the system
                    </span>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent">
                    <div className="flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span className="font-medium">Upload Documents</span>
                    </div>
                    <span className="text-sm text-muted-foreground text-left">
                      Upload verification documents for students
                    </span>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="h-4 w-4" />
                      <span className="font-medium">Batch Update Status</span>
                    </div>
                    <span className="text-sm text-muted-foreground text-left">
                      Update multiple diploma statuses at once
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-balance">Recent Activity</CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New diploma verified</p>
                    <p className="text-xs text-muted-foreground">John Smith - Computer Science</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Document uploaded</p>
                    <p className="text-xs text-muted-foreground">Sarah Johnson - Transcript</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-chart-4 rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Batch status update</p>
                    <p className="text-xs text-muted-foreground">25 diplomas marked as issued</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Verification pending</p>
                    <p className="text-xs text-muted-foreground">Mike Davis - Missing documents</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-balance">Diploma Status Overview</CardTitle>
            <CardDescription>Current status distribution of all diplomas in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">856</p>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <Clock className="h-8 w-8 text-chart-4" />
                <div>
                  <p className="text-2xl font-bold">234</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <FileText className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">134</p>
                  <p className="text-sm text-muted-foreground">In Review</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
