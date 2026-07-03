"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [students, setStudents] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    country: "",
    contact: "",
    gender: "",
    email: "",
    course: "",
    year: "",
    institution: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStudent = {
      id: Date.now(), 
      ...formData,
    };
    
    setStudents([...students, newStudent]);
    setFormData({
      name: "",
      dob: "",
      country: "",
      contact: "",
      gender: "",
      email: "",
      course: "",
      year: "",
      institution: "",
    });
  };
  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      try {
        const parsedStudents = JSON.parse(savedStudents);
        if (Array.isArray(parsedStudents)) {
          setStudents(parsedStudents);
        }
      } catch (error) {
        console.error("Failed to parse students from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students]);

  return (
    <div className="container" style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Student Management System</h1>
      
      <div className="Card" style={{ marginBottom: "20px" }}>
        <h2>Dashboard</h2>
        <p>Total Students: {students.length}</p>
      </div>
      <form onSubmit={handleAddStudent} style={{ display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr", marginBottom: "30px", maxWidth: "600px" }}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} required />
        <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
        <input type="text" name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} required />
        
        <button type="submit" style={{ gridColumn: "span 2", padding: "10px", cursor: "pointer" }}>Save Student</button>
      </form>

      <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Course</th>
            <th>Year</th>
            <th>Institution</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>No students added yet</td>
            </tr>
          ) : (
            students.map((student: any) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                <td>{student.country}</td>
                <td>{student.contact}</td>
                <td>{student.email}</td>
                <td>{student.dob}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
                <td>{student.institution}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}



























































































