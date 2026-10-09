import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import type { LearningProject } from "@/lib/student-content";

/**
 * Entire surface is a link. Inner project screenshots, counters and arrows
 * are illustrations, never misleading nested interactive controls.
 */
export function ProjectCard({ project, featured = false }: { project: LearningProject; featured?: boolean }) {
  return (
    <Link className="sl-project-card sl-project-card--verified" href={`/projects/${project.slug}`}>
      <ProjectVisual visual={project.visual} />
      <div className="sl-project-card-body">
        <div className="sl-project-tags">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        {featured ? <h3>{project.title}</h3> : <h2>{project.title}</h2>}
        <p>{project.subtitle}</p>
        <div className="sl-project-card__method">
          <span>접근 방법</span>
          <strong>{project.method}</strong>
        </div>
        <div className="sl-project-tech">
          <span>{project.level} · 약 {project.minutes}분</span>
          <strong>상세 내용 보기 <span aria-hidden="true">↗</span></strong>
        </div>
      </div>
    </Link>
  );
}
