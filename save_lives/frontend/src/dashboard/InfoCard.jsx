
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function InfoCard() {
  return (
    <div className="px-4">
      <div className="grid md:grid-cols-2 gap-6 xl:gap-12 items-start">
        <Card className='info-card'>
          <Card.Header className="pb-0">
            <Card.Title>Select Category</Card.Title>
            <Card.Text>Choose from a variety of categories</Card.Text>
          </Card.Header>
          <Card.Body className="space-y-4">
            <div className="flex items-center gap-4">
              <ShirtIcon className="w-8 h-8" />
              <Link href="#">Apparel</Link>
            </div>
            <div className="flex items-center gap-4">
              <SmartphoneIcon className="w-8 h-8" />
              <Link href="#">Technology</Link>
            </div>
            <div className="flex items-center gap-4">
              <BookIcon className="w-8 h-8" />
              <Link href="#">Books</Link>
            </div>
            <div className="flex items-center gap-4">
              <MusicIcon className="w-8 h-8" />
              <Link href="#">Music</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function MusicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}


function ShirtIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  )
}


function SmartphoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}
