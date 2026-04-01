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

function calcDDay(dateStr: string): number | null {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : null;
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
            {medicalRecords.map((record) => {
              const dday = calcDDay(record.date);
              return (
                <li key={record.id} className="medical-record-item">
                  <span className="medical-record-date">
                    {formatDate(record.date)}
                  </span>
                  <span className="medical-record-title">{record.title}</span>
                  {dday !== null && (
                    <span className={`medical-record-dday${dday <= 7 ? ' medical-record-dday--urgent' : ''}`}>
                      D-{dday}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export default MedicalRecords;
