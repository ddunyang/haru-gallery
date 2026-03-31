import './MedicalRecords.css';
import { medicalRecords } from '../data/mediaData';
import EmptyState from './EmptyState';

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year) return dateStr;
  if (!month) return `${year}`;
  if (!day) return `${year}.${month}`;
  return `${year}.${month}.${day}`;
}

function MedicalRecords() {
  return (
    <section className="medical-records">
      <div className="medical-records-inner">
        <div className="section-header">
          <span className="section-label">진료기록</span>
          <div className="section-line" />
          {medicalRecords.length > 0 && (
            <span className="section-count">{medicalRecords.length}</span>
          )}
        </div>
        {medicalRecords.length === 0 ? (
          <EmptyState dark />
        ) : (
          <ul className="medical-record-list">
            {medicalRecords.map((record) => (
              <li key={record.id} className="medical-record-item">
                <span className="medical-record-date">
                  {formatDate(record.date)}
                </span>
                <span className="medical-record-title">{record.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default MedicalRecords;
