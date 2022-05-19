

function forgot() {
  return (
    <div>
    <form onSubmit={this.handleSubmit}>
      <label>
        Password
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
      </label>
      <label>
        Re-type password
        <input
          name="passwordVerify"
          type="password"
          value={this.state.passwordVerify}
          onChange={this.handleInputChange}
        />
      </label>
      <button type="submit">Reset password</button>
    </form>
  </div>
);
}


export default forgot
