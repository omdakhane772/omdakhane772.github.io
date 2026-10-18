import React, { useState } from 'react';
import { skillsCategories } from '../data/skillsData';

export const Skills = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [openedSkills, setOpenedSkills] = useState({});

  const currentCategory = skillsCategories[selectedCategoryIdx];

  const handleTabKeyDown = (e, index) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const nextIdx =
        (index + (e.key === 'ArrowRight' ? 1 : skillsCategories.length - 1)) %
        skillsCategories.length;
      setSelectedCategoryIdx(nextIdx);
      const nextBtn = document.getElementById(`tab-${nextIdx}`);
      nextBtn?.focus();
    }
  };

  const toggleSkill = (skillName) => {
    setOpenedSkills((prev) => ({
      ...prev,
      [skillName]: !prev[skillName],
    }));
  };

  return (
    <section id="skills">
      <div className="wrap">
        <div className="head rv">
          <div className="eyebrow mono">TECH STACK</div>
          <h2>The Technologies Behind My Work.</h2>
          <p className="sub">Tools, technologies, and concepts I use or am actively developing.</p>
        </div>

        {/* Tab Buttons */}
        <div className="tabs" role="tablist" aria-label="Skill categories" id="tabs">
          {skillsCategories.map((cat, idx) => {
            const isSelected = selectedCategoryIdx === idx;
            return (
              <button
                key={cat.category}
                id={`tab-${idx}`}
                type="button"
                className="tab"
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedCategoryIdx(idx)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
              >
                {cat.category.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div
          className="skills"
          id="skills-grid"
          role="tabpanel"
          aria-labelledby={`tab-${selectedCategoryIdx}`}
          aria-live="polite"
        >
          {currentCategory.items.map((item) => {
            const isOpen = !!openedSkills[item.name];
            return (
              <button
                key={item.name}
                type="button"
                className={`sk ${isOpen ? 'open' : ''}`}
                style={{ '--c': currentCategory.color }}
                aria-expanded={isOpen}
                onClick={() => toggleSkill(item.name)}
              >
                <div className="sk-top">
                  <span className="sk-ic">{item.badge}</span>
                  <h3>{item.name}</h3>
                  <span className="st" aria-hidden="true" />
                </div>
                <p>{item.summary}</p>
                <div className="use">
                  <div>
                    <div className="u">
                      <em>USE CASE:</em> {item.useCase}
                    </div>
                    {item.related && item.related.length > 0 && (
                      <div className="rel" aria-label="Related">
                        {item.related.map((relItem) => (
                          <span key={relItem}>{relItem}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
