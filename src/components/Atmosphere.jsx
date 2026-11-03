import './Atmosphere.css';

/** Fixed ambient light field. Gradients only — no filters — drifting on the compositor. */
export function Atmosphere() {
  return (
    <div className="atmo" aria-hidden="true">
      <div className="atmo__light atmo__light--a" />
      <div className="atmo__light atmo__light--b" />
      <div className="atmo__light atmo__light--c" />
      <div className="atmo__vignette" />
    </div>
  );
}
