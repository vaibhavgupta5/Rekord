// app/admin/moderation/page.jsx
import ModeratedContentList from '@/components/ModeratedContentList';

export default function ModerationPage() {
  return (
    <div className="container mx-auto py-8">
      <ModeratedContentList />
    </div>
  );
}