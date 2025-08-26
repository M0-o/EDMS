import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Download, GraduationCap, Mail, User, FileText, Building2, CheckCircle, XCircle } from 'lucide-react'
import {useParams} from "react-router-dom"
import {useStudentService} from "@/services/studentService"
import {useState , useEffect} from "react"
import {studentSchemaOut} from "@/schemas/studentSchemas"
import {z} from "zod"


function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

function getDocumentTypeIcon(documentType: string) {
  switch (documentType) {
    case 'high_school_diploma':
      return <GraduationCap className="h-5 w-5 text-purple-600" />
    case 'national_id':
      return <User className="h-5 w-5 text-blue-600" />
    case 'previous_diploma':
      return <GraduationCap className="h-5 w-5 text-green-600" />
    case 'transcript':
      return <FileText className="h-5 w-5 text-orange-600" />
    default:
      return <FileText className="h-5 w-5 text-gray-600" />
  }
}

function getDocumentTypeBadgeColor(documentType: string) {
  switch (documentType) {
    case 'high_school_diploma':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
    case 'national_id':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
    case 'previous_diploma':
      return 'bg-green-100 text-green-800 hover:bg-green-100'
    case 'transcript':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-100'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  }
}

export default function StudentDetailsPage() {
  const { studentId }= useParams();
  const studentService = useStudentService()
  const [student, setStudent] = useState<z.infer<typeof studentSchemaOut> | null>(null)

  useEffect(() => {
      const fetchStudent = async () => {
        const student = await studentService.getOne(Number.parseInt(studentId || "1")).catch((error) => {
          console.error("Failed to fetch student:", error)
          return null
        })
        setStudent(student)
        console.log("Fetched student:", student)
      }
  
      fetchStudent()
      
    }, [])

  if (!student) {
    return <div className="container mx-auto p-6">Loading...</div>
  }
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Student Header */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="text-lg">
                  {getInitials(student.first_name, student.last_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">
                  {student.first_name} {student.last_name}
                </CardTitle>
                <CardDescription className="text-base mb-4">
                  Student ID: {student.id}
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">CNE: {student.cne}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Apogee: {student.apogee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Joined: {formatDate(student.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Diplomas Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Diplomas & Certificates</h2>
          <Badge variant="secondary" className="ml-2">
            {student.diplomas?.length} Total
          </Badge>
        </div>

        <div className="grid gap-6">
          {student.diplomas?.map((diploma) => (
            <Card key={diploma.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{diploma.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <CardDescription className="text-base">
                        {diploma.institution}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>Issued: {formatDate(diploma.issue_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>Added: {formatDate(diploma.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {diploma.is_valid ? (
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Valid
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Invalid
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {diploma.document && (
                <>
                  <Separator />
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{diploma.document?.original_filename}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded: {formatDate(diploma.document?.uploaded_at)}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(diploma.document?.download_url, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Verification Documents Section */}
      {(student.verification_documents) && (student.verification_documents.length > 0) && (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Verification Documents</h2>
          <Badge variant="secondary" className="ml-2">
            {student.verification_documents.length} Documents
          </Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Supporting documents used to verify the authenticity and validity of new diplomas
        </p>

        <div className="grid gap-4">
          {student.verification_documents.map((doc) => (
            <Card key={doc.id} className="relative">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {getDocumentTypeIcon(doc.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{doc.type}</h3>
                        <Badge className={getDocumentTypeBadgeColor(doc.type)}>
                          {doc.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{doc.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          <span>Uploaded: {formatDate(doc.uploaded_at)}</span>
                        </div>
                      </div>
                      {doc && (
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {doc.original_filename} • Uploaded: {formatDate(doc.uploaded_at)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(doc.download_url, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
)}
      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {student.diplomas?.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Diplomas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {student.diplomas?.filter(d => d.is_valid).length}
              </div>
              <div className="text-sm text-muted-foreground">Valid Diplomas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {student.diplomas?.filter(d => d.document).length}
              </div>
              <div className="text-sm text-muted-foreground">With Documents</div>
            </div>
            {(student.verification_documents) && (student.verification_documents.length > 0) && (
            <><div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {student.verification_documents.length}
              </div>
              <div className="text-sm text-muted-foreground">Verification Docs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {student.verification_documents.filter(d => d.is_verified).length}
              </div>
              <div className="text-sm text-muted-foreground">Verified Docs</div>
            </div></>)
}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
