import DogCharacter from './DogCharacter';
import './EmptyState.css';

interface EmptyStateProps {
  dark?: boolean;
}

function EmptyState({ dark = false }: EmptyStateProps) {
  return (
    <div className={`empty-state${dark ? ' empty-state--dark' : ''}`}>
      <DogCharacter className="empty-state-dog" size={165} />
      <p className="empty-state-text">등록된 콘텐츠가 없습니다.</p>
    </div>
  );
}

export default EmptyState;
