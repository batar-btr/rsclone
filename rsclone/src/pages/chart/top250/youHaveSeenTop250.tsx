
export const YouHaveSeenWidget = () => {
  return (
    <div className="sidebar__seen">
      <h3>You Have Seen</h3>
      <div className="sidebar__seen_score">
        <span className="sidebar__seen_count">0</span>/
        <span className="sidebar__seen_size">250</span>
        <span className="sidebar__seen_pct">(0%)</span>
        <div className="sidebar__seen_hide-seen">
          <input id="hide-seen-top-250" type="checkbox" />
          <label htmlFor="hide-seen-top-250">Hide titles I've seen</label>
        </div>
      </div>
    </div>
  );
};
