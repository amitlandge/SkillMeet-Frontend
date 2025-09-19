import { Card, CardContent } from "@mui/material";


export default function LearnerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">👨‍🎓 Learner Dashboard</h1>

      {/* Hero Welcome */}
      <Card className="mb-6 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">Welcome Back!</h2>
          <p className="text-gray-600">
            Explore new tutors, track your bookings, and continue your learning
            journey 🚀
          </p>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Browse Tutors */}
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">📚 Browse Tutors</h3>
            <p className="text-gray-600">
              Find the right tutor for your skills and goals.
            </p>
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-xl">
              Explore Tutors
            </button>
          </CardContent>
        </Card>

        {/* My Bookings */}
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">📅 My Bookings</h3>
            <p className="text-gray-600">
              Check your upcoming and past learning sessions.
            </p>
            <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-xl">
              View Bookings
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
