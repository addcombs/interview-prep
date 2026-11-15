import { STUDY_GUIDES } from './study-guides/study-guide';
import { TECHNOLOGY_GROUPS, findTechnology } from './technologies';

describe('TECHNOLOGY_GROUPS', () => {
  const technologies = TECHNOLOGY_GROUPS.flatMap((group) => group.technologies);

  it('gives every technology a unique, URL-safe slug', () => {
    const slugs = technologies.map((technology) => technology.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('gives every technology a full study guide with an official link', () => {
    expect(Object.keys(STUDY_GUIDES).sort()).toEqual(technologies.map((technology) => technology.slug).sort());
    for (const { slug, name } of technologies) {
      const { overview, concepts, questions, pitfalls, learnMore } = STUDY_GUIDES[slug];
      expect(overview.length, name).toBeGreaterThan(100);
      expect(concepts.length, name).toBeGreaterThanOrEqual(3);
      concepts.forEach((concept) => {
        expect(concept.term, name).not.toBe('');
        expect(concept.detail.length, name).toBeGreaterThan(40);
      });
      expect(new Set(concepts.map((concept) => concept.term)).size, name).toBe(concepts.length);
      expect(questions.length, name).toBeGreaterThanOrEqual(2);
      questions.forEach((item) => {
        expect(item.question, name).toMatch(/\?$/);
        expect(item.answer.length, name).toBeGreaterThan(40);
      });
      expect(new Set(questions.map((item) => item.question)).size, name).toBe(questions.length);
      expect(pitfalls.length, name).toBeGreaterThanOrEqual(2);
      expect(learnMore.url, name).toMatch(/^https:\/\//);
    }
  });

  it('finds a technology and its group by slug', () => {
    expect(findTechnology('angular')?.technology.name).toBe('Angular');
    expect(findTechnology('aws-lambda')?.groupIndex).toBe(2);
    expect(findTechnology('cobol')).toBeUndefined();
  });
});
