import { Card, CardContent } from "@mui/material";

export default function TutorDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">👨‍🏫 Tutor Dashboard</h1>

      {/* Hero Welcome */}
      <Card className="mb-6 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">Welcome, Tutor!</h2>
          <p className="text-gray-600">
            Manage your profile, accept bookings, and grow your teaching journey
            🌟
          </p>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Profile */}
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">👤 My Profile</h3>
            <p className="text-gray-600">
              Update your bio, skills, and hourly rate.
            </p>
            <button className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-xl">
              Edit Profile
            </button>
          </CardContent>
        </Card>

        {/* Booking Requests */}
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">📩 Booking Requests</h3>
            <p className="text-gray-600">
              Accept or reject learner booking requests.
            </p>
            <button className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-xl">
              View Requests
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
