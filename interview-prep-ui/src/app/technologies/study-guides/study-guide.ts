import { BACK_END } from './back-end';
import { CLOUD } from './cloud';
import { FRONT_END } from './front-end';
import { TOOLS } from './tools';

/** A term or idea worth knowing cold. */
export interface Concept {
  term: string;
  detail: string;
}

/** A question an interviewer might ask, with a model answer. */
export interface InterviewQuestion {
  question: string;
  answer: string;
}

/** One technology's study guide. Only the lazily loaded guide page imports these, so they stay out of the initial bundle. */
export interface StudyGuide {
  /** What the technology is and why it exists, in a few sentences. */
  overview: string;
  concepts: Concept[];
  questions: InterviewQuestion[];
  /** Mistakes people make with it, and that interviewers like to probe. */
  pitfalls: string[];
  /** The technology's official documentation, for going deeper. */
  learnMore: { label: string; url: string };
}

/** Every study guide, keyed by its technology's slug. */
export const STUDY_GUIDES: Record<string, StudyGuide> = { ...FRONT_END, ...BACK_END, ...CLOUD, ...TOOLS };
