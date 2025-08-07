import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Download, GraduationCap, Mail, User, FileText, Building2, CheckCircle, XCircle } from 'lucide-react'

// Sample student data based on the provided format
const studentData = {
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "cne": "CNE123456789",
  "apogee": "APG987654321",
  "email": "john.doe@example.com",
  "diplomas": [
    {
      "id": 2,
      "student_id": 1,
      "title": "Bachelor of Computer Science",
      "institution": "University of Technology",
      "issue_date": "2025-07-28",
      "is_valid": true,
      "document": null,
      "created_at": "2025-07-28T00:35:45.734839Z"
    },
    {
      "id": 13,
      "student_id": 1,
      "title": "Master of Software Engineering",
      "institution": "EMSI",
      "issue_date": "2025-08-01",
      "is_valid": true,
      "document": {
        "id": 4,
        "original_filename": "diploma_certificate.jpg",
        "document_type": "new_diploma",
        "student_id": 1,
        "diploma_id": 13,
        "file_path": "jpeg/new_diploma/1/2025/08/518fcc1588764658b65dc36655126a4d.jpg",
        "download_url": "http://localhost:8000/uploads/jpeg/new_diploma/1/2025/08/518fcc1588764658b65dc36655126a4d.jpg",
        "uploaded_by_clerk_user_id": "user_30d5G5HS9Xo6TkFysXMtf9bWYhy",
        "uploaded_at": "2025-08-06T09:50:41.912056Z"
      },
      "created_at": "2025-08-06T09:50:41.899917Z"
    },
    {
      "id": 14,
      "student_id": 1,
      "title": "Certificate in Data Science",
      "institution": "Tech Institute",
      "issue_date": "2025-08-01",
      "is_valid": false,
      "document": {
        "id": 5,
        "original_filename": "certificate.jpg",
        "document_type": "new_diploma",
        "student_id": 1,
        "diploma_id": 14,
        "file_path": "jpeg/new_diploma/1/2025/08/c704467860f34874b0955c36e877a5ca.jpg",
        "download_url": "http://localhost:8000/uploads/jpeg/new_diploma/1/2025/08/c704467860f34874b0955c36e877a5ca.jpg",
        "uploaded_by_clerk_user_id": "user_30d5G5HS9Xo6TkFysXMtf9bWYhy",
        "uploaded_at": "2025-08-06T09:52:21.767539Z"
      },
      "created_at": "2025-08-06T09:52:21.753788Z"
    }
  ],
  "created_at": "2025-07-26T04:30:39.491378Z"
}

// Add verification documents to the student data
const verificationDocuments = [
  {
    "id": 1,
    "student_id": 1,
    "document_type": "high_school_diploma",
    "title": "High School Diploma",
    "description": "Baccalauréat Sciences Mathématiques",
    "institution": "Lycée Mohammed V",
    "issue_date": "2020-06-15",
    "is_verified": true,
    "document": {
      "id": 20,
      "original_filename": "bac_diploma.pdf",
      "file_path": "pdf/verification/1/2025/07/bac_diploma_verified.pdf",
      "download_url": "http://localhost:8000/uploads/pdf/verification/1/2025/07/bac_diploma_verified.pdf",
      "uploaded_at": "2025-07-26T10:15:30.123456Z"
    },
    "created_at": "2025-07-26T10:15:30.123456Z"
  },
  {
    "id": 2,
    "student_id": 1,
    "document_type": "national_id",
    "title": "National ID Card",
    "description": "Carte d'Identité Nationale",
    "institution": "Ministry of Interior",
    "issue_date": "2023-03-10",
    "is_verified": true,
    "document": {
      "id": 21,
      "original_filename": "cin_front_back.jpg",
      "file_path": "jpeg/verification/1/2025/07/cin_verified.jpg",
      "download_url": "http://localhost:8000/uploads/jpeg/verification/1/2025/07/cin_verified.jpg",
      "uploaded_at": "2025-07-26T10:20:45.789012Z"
    },
    "created_at": "2025-07-26T10:20:45.789012Z"
  },
  {
    "id": 3,
    "student_id": 1,
    "document_type": "previous_diploma",
    "title": "Bachelor's Degree Certificate",
    "description": "Licence en Informatique",
    "institution": "Université Hassan II",
    "issue_date": "2023-07-20",
    "is_verified": true,
    "document": {
      "id": 22,
      "original_filename": "licence_certificate.pdf",
      "file_path": "pdf/verification/1/2025/07/licence_verified.pdf",
      "download_url": "http://localhost:8000/uploads/pdf/verification/1/2025/07/licence_verified.pdf",
      "uploaded_at": "2025-07-26T10:25:15.345678Z"
    },
    "created_at": "2025-07-26T10:25:15.345678Z"
  },
  {
    "id": 4,
    "student_id": 1,
    "document_type": "transcript",
    "title": "Academic Transcript",
    "description": "Official transcript from previous institution",
    "institution": "Université Hassan II",
    "issue_date": "2023-07-25",
    "is_verified": false,
    "document": {
      "id": 23,
      "original_filename": "transcript_official.pdf",
      "file_path": "pdf/verification/1/2025/07/transcript_pending.pdf",
      "download_url": "http://localhost:8000/uploads/pdf/verification/1/2025/07/transcript_pending.pdf",
      "uploaded_at": "2025-07-26T10:30:20.567890Z"
    },
    "created_at": "2025-07-26T10:30:20.567890Z"
  }
]

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
  const student = studentData

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
            {student.diplomas.length} Total
          </Badge>
        </div>

        <div className="grid gap-6">
          {student.diplomas.map((diploma) => (
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
                          <p className="font-medium">{diploma.document.original_filename}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded: {formatDate(diploma.document.uploaded_at)}
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
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Verification Documents</h2>
          <Badge variant="secondary" className="ml-2">
            {verificationDocuments.length} Documents
          </Badge>
        </div>
        <p className="text-muted-foreground mb-6">
          Supporting documents used to verify the authenticity and validity of new diplomas
        </p>

        <div className="grid gap-4">
          {verificationDocuments.map((doc) => (
            <Card key={doc.id} className="relative">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {getDocumentTypeIcon(doc.document_type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{doc.title}</h3>
                        <Badge className={getDocumentTypeBadgeColor(doc.document_type)}>
                          {doc.document_type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{doc.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{doc.institution}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          <span>Issued: {formatDate(doc.issue_date)}</span>
                        </div>
                      </div>
                      {doc.document && (
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {doc.document.original_filename} • Uploaded: {formatDate(doc.document.uploaded_at)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.is_verified ? (
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        <XCircle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    {doc.document && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(doc.document?.download_url, '_blank')}
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

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {student.diplomas.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Diplomas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {student.diplomas.filter(d => d.is_valid).length}
              </div>
              <div className="text-sm text-muted-foreground">Valid Diplomas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {student.diplomas.filter(d => d.document).length}
              </div>
              <div className="text-sm text-muted-foreground">With Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {verificationDocuments.length}
              </div>
              <div className="text-sm text-muted-foreground">Verification Docs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {verificationDocuments.filter(d => d.is_verified).length}
              </div>
              <div className="text-sm text-muted-foreground">Verified Docs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
