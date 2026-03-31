import './HaruProfile.css';

const BIRTH_DATE = new Date('2025-07-17');

function calcAge(birth: Date, now: Date) {
  const diffMs = now.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days, totalDays };
}

function HaruProfile() {
  const now = new Date();
  const { years, months, days, totalDays } = calcAge(BIRTH_DATE, now);

  const ageLabel =
    years >= 1
      ? `${years}살 ${months}개월`
      : months > 0
      ? `${months}개월 ${days}일`
      : `${days}일`;

  const birthFormatted = BIRTH_DATE.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="haru-profile">
      <div className="haru-profile-inner">
        <div className="haru-profile-avatar">🐾</div>
        <h2 className="haru-profile-name">
          하루
          <span className="haru-profile-gender" title="암컷">♀</span>
        </h2>
        <p className="haru-profile-breed">래브라도 리트리버 (진돗개 믹스 추정)</p>
        <div className="haru-profile-stats">
          <div className="haru-profile-stat">
            <span className="haru-profile-stat-label">생일</span>
            <span className="haru-profile-stat-value">{birthFormatted}</span>
          </div>
          <div className="haru-profile-stat-divider" />
          <div className="haru-profile-stat">
            <span className="haru-profile-stat-label">나이</span>
            <span className="haru-profile-stat-value">{ageLabel}</span>
          </div>
          <div className="haru-profile-stat-divider" />
          <div className="haru-profile-stat">
            <span className="haru-profile-stat-label">생후</span>
            <span className="haru-profile-stat-value">{totalDays.toLocaleString()}일째</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HaruProfile;
