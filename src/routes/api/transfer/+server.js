import Image from "@assets/images/image.png"

export async function GET() {
  return new Response(
    JSON.stringify([
      {
        id:1,
        show: { name: "Jetpack Comedy", image: Image },
        date: { date: "August 2, 2024", day: "Monday" },
        time: "8:30 PM",
        club: "The Hollywood Improv",
        capacity: { current: 75, total: 100 },
      },
      {
        id: 2,
        show: { name: "Jetpack Comedy", image: Image },
        date: { date: "August 3, 2024", day: "Tuesday" },
        time: "8:30 PM",
        club: "The Hollywood Improv",
        capacity: { current: 50, total: 100 },
      },
      {
        id: 3,
        show: { name: "Jetpack Comedy", image: Image },
        date: { date: "August 11, 2024", day: "Wednesday" },
        time: "8:30 PM",
        club: "The Hollywood Improv",
        capacity: { current: 18, total: 100 },
      },
      {
        id: 4,
        show: { name: "Jetpack Comedy", image: Image },
        date: { date: "August 16, 2024", day: "Sunday" },
        time: "8:30 PM",
        club: "The Hollywood Improv",
        capacity: { current: 35, total: 100 },
      },
      {
        id: 5,
        show: { name: "Jetpack Comedy", image: Image },
        date: { date: "August 16, 2024", day: "Sunday" },
        time: "8:30 PM",
        club: "The Hollywood Improv",
        capacity: { current: 80, total: 100 },
      },
      {
        id: 6,
        show: { name: "Jetpack Comedy", image: Image },
        date: { date: "August 16, 2024", day: "Sunday" },
        time: "8:30 PM",
        club: "The Hollywood Improv",
        capacity: { current: 90, total: 100 },
      },
      {
        id: 7,
        show: { name: "Jetpack Comedy", image: Image },
        date: { date: "August 16, 2024", day: "Sunday" },
        time: "8:30 PM",
        club: "The Hollywood Improv",
        capacity: { current: 40, total: 100 },
      },
      {
        id: 8,
        show: { name: "Jetpack Comedy", image: Image },
        date: { date: "August 16, 2024", day: "Sunday" },
        time: "8:30 PM",
        club: "The Hollywood Improv",
        capacity: { current: 30, total: 100 },
      },
    ])
  )

}
