import { useState } from "react";

const ControlledForm = () => {
  document.title = "Form";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmpassword || !gender) {
      alert("All fields must be filled before submission!");
      return;
    }

    if (password !== confirmpassword) {
      alert("Password must match with confirm password");
      return;
    }

    const newObject = {
      name,
      email,
      password,
      gender,
    };
    console.log(newObject);

    fetch("http://localhost:3000/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newObject),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  // try {
  //   const response = await fetch("http://localhost:3000/extract", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newObject),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to submit form");
  //   }

  //   const result = await response.json();
  //   console.log("Success:", result);
  //   alert("Form submitted successfully!");
  // } catch (error) {
  //   console.error("Error:", error);
  //   alert("Error submitting form");
  // }
  //   };
  return (
    <div>
      <h1> Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="comfirmpassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <p>Gender</p>
          <div className="">
            <label htmlFor="male">Male:</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              required
            />

            <label htmlFor="male">Female:</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="">
          {loading ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ControlledForm;
