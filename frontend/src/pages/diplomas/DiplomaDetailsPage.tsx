import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDays, Download, GraduationCap, User, FileText, Building2, CheckCircle, XCircle, Clock, Eye, ArrowLeft, AlertCircle, History } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDiplomaService } from "@/services/diplomaService"
import { z } from "zod"
import { diplomaSchemaOut } from "@/schemas/diplomaSchemas"

const diplomaData = {
  "id": 24,
  "student_id": 3,
  "title": "Master of Computer Science",
  "institution": "École Nationale Supérieure d'Informatique",
  "issue_date": "2025-08-06",
  "is_valid": true,
  "document": {
    "id": 15,
    "original_filename": "master_diploma_certificate.jpg",
    "type": "new_diploma",
    "student_id": 3,
    "diploma_id": 24,
    "file_path": "jpeg/new_diploma/3/2025/08/8431a7705cae42678c7e12347eb1e6f6.jpg",
    "download_url": "http://localhost:8000/uploads/jpeg/new_diploma/3/2025/08/8431a7705cae42678c7e12347eb1e6f6.jpg",
    "uploaded_by_clerk_user_id": "user_30d5G5HS9Xo6TkFysXMtf9bWYhy",
    "uploaded_at": "2025-08-06T13:46:46.534069Z"
  },
  "status_history": [
    {
      "status": "en attente",
      "reason": null,
      "notes": null,
      "id": 1,
      "diploma_id": 24,
      "changed_by_clerk_user_id": "user_30d5G5HS9Xo6TkFysXMtf9bWYhy",
      "date": "2025-08-06T13:46:46.577285Z"
    },
    {
      "status": "en cours de vérification",
      "reason": "Documents soumis pour vérification",
      "notes": "Vérification des informations avec l'institution",
      "id": 2,
      "diploma_id": 24,
      "changed_by_clerk_user_id": "user_admin_123",
      "date": "2025-08-07T09:15:30.123456Z"
    },
    {
      "status": "validé",
      "reason": "Vérification complétée avec succès",
      "notes": "Toutes les informations ont été confirmées par l'institution",
      "id": 3,
      "diploma_id": 24,
      "changed_by_clerk_user_id": "user_admin_123",
      "date": "2025-08-07T14:30:45.789012Z"
    }
  ],
  "created_at": "2025-08-06T13:46:46.523506Z"
}

// Sample student data for context
const studentInfo = {
  "id": 3,
  "first_name": "Sarah",
  "last_name": "Johnson",
  "email": "sarah.johnson@example.com"
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'en attente':
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="h-3 w-3 mr-1" />
          En Attente
        </Badge>
      )
    case 'envoyé à la présidence':
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          Envoyé à la Présidence
        </Badge>
      )
    case 'arrivé à la présidence':
      return (
        <Badge variant="secondary" className="bg-blue-200 text-blue-900 hover:bg-blue-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Arrivé à la Présidence
        </Badge>
      )
    case 'envoyé à l\'établissement':
      return (
        <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          Envoyé à l'Établissement
        </Badge>
      )
    case 'arrivé à l\'établissement':
      return (
        <Badge variant="secondary" className="bg-purple-200 text-purple-900 hover:bg-purple-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Arrivé à l'Établissement
        </Badge>
      )
    case 'correction requise':
      return (
        <Badge variant="destructive" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          <XCircle className="h-3 w-3 mr-1" />
          Correction Requise
        </Badge>
      )
    case 'renvoyé après correction':
      return (
        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          Renvoyé après Correction
        </Badge>
      )
    case 'signé par le président':
      return (
        <Badge variant="default" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          Signé par le Président
        </Badge>
      )
    case 'prêt':
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          Prêt
        </Badge>
      )
    case 'délivré':
      return (
        <Badge variant="default" className="bg-green-200 text-green-900 hover:bg-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Délivré
        </Badge>
      )
    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      )
  }
}

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'en attente':
      return <Clock className="h-4 w-4 text-yellow-600" />
    case 'envoyé à la présidence':
      return <AlertCircle className="h-4 w-4 text-blue-600" />
    case 'arrivé à la présidence':
      return <CheckCircle className="h-4 w-4 text-blue-700" />
    case 'envoyé à l\'établissement':
      return <AlertCircle className="h-4 w-4 text-purple-600" />
    case 'arrivé à l\'établissement':
      return <CheckCircle className="h-4 w-4 text-purple-700" />
    case 'correction requise':
      return <XCircle className="h-4 w-4 text-orange-600" />
    case 'renvoyé après correction':
      return <AlertCircle className="h-4 w-4 text-indigo-600" />
    case 'signé par le président':
      return <CheckCircle className="h-4 w-4 text-emerald-600" />
    case 'prêt':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'délivré':
      return <CheckCircle className="h-4 w-4 text-green-700" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

export default function DiplomaDetailsPage() {
  const { diplomaId } = useParams()
  const [diploma , setDiploma] = useState<z.infer<typeof diplomaSchemaOut> | null>(null)
  const diplomaService = useDiplomaService()
  const student = studentInfo
  const currentStatus = diploma?.current_status
  const navigate = useNavigate()

   useEffect(() => {
        const fetchDiploma = async () => {
          const diploma = await diplomaService.getOne(Number.parseInt(diplomaId || "1")).catch((error) => {
            console.error("Failed to fetch diploma:", error)
            return null
          })
          setDiploma(diploma)
          console.log("Fetched diploma:", diploma)
        }

        fetchDiploma()

      }, [])

  if(!diploma) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <h1 className="text-2xl font-bold">Loading Diploma Details...</h1>
      </div>
    )
  }
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Student
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Diploma Details</h1>
          <p className="text-muted-foreground">ID: {diploma.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Diploma Information */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{diploma.title}</CardTitle>
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
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(currentStatus || "en attente")}
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
          </Card>

          {/* Document Section */}
          {diploma.document && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Diploma Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{diploma.document.original_filename}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded: {formatDateTime(diploma.document.uploaded_at)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Document ID: {diploma.document.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(diploma.document?.download_url, '_blank')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => window.open(diploma.document?.download_url, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Status History
              </CardTitle>
              <CardDescription>
                Timeline of status changes for this diploma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diploma.status_history?.map((history, index) => (
                  <div key={history.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-white border-2 border-gray-200 rounded-full">
                        {getStatusIcon(history.status)}
                      </div>
                      {index < diploma.status_history.length - 1 && (
                        <div className="w-px h-16 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(history.status)}
                        <span className="text-sm text-muted-foreground">
                          {formatDateTime(history.date)}
                        </span>
                      </div>
                      {history.reason && (
                        <p className="text-sm font-medium mb-1">{history.reason}</p>
                      )}
                      {history.notes && (
                        <p className="text-sm text-muted-foreground mb-2">{history.notes}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Changed by: {history.changed_by_clerk_user_id}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Student Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{student.first_name} {student.last_name}</p>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student ID:</span>
                  <span className="font-medium">{student.id}</span>
                </div>
              </div>
              <Button onClick={() => {navigate(`/students/${student.id}`)}} variant="outline" className="w-full mt-4" size="sm">
                View Student Profile
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Update Status
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Add Note
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          {/* Diploma Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Diploma Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {diploma?.status_history.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Status Changes</div>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor((Date.now() - new Date(diploma.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-sm text-muted-foreground">Days Since Creation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
