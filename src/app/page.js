import AppointmentCreationFlow from "@/components/appointments/AppointmentCreationFlow";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">        
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Appointment System</h1>
        <p className="text-gray-600">
          Please access the application with your hospital subdomain:
          <br />
          <code className="bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
            localhost:3000/your-hospital-slug
          </code>
        </p>
      </div>
    </div>
  );
}
