const TimelineItem = ({ title, date, description, company, gpa, coursework }) => {
  const renderDescription = () => {
    if (!description) return null;
    if (Array.isArray(description)) {
      return (
        <ul className="timeline-bullets">
          {description.map((item, i) => (
            <li key={i} className="timeline-text">{item}</li>
          ))}
        </ul>
      );
    }
    return <p className="timeline-text">{description}</p>;
  };

  if (company) {
    return (
      <li className="timeline-item">
        <div className="timeline-header">
          <h4 className="h4 timeline-item-title">{company}</h4>
          <span>{date}</span>
        </div>
        <div className="timeline-subtitle-row">
          <p className="timeline-subtitle">{title}</p>
          {gpa && <span className="timeline-gpa">GPA: {gpa}</span>}
        </div>
        {coursework && (
          <div className="timeline-coursework">
            <p className="timeline-coursework-label">Relevant Coursework:</p>
            <p className="timeline-text">{coursework}</p>
          </div>
        )}
        {renderDescription()}
      </li>
    );
  }

  return (
    <li className="timeline-item">
      <h4 className="h4 timeline-item-title">{title}</h4>
      <span>{date}</span>
      {renderDescription()}
    </li>
  );
}

export default TimelineItem;
