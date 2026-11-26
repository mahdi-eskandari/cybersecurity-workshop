// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import User from "../../../model/User";
// import nodemailer from "nodemailer";

// function generateCode() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email is required." },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const user = await User.findOne({
//       email: email.toLowerCase(),
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found." },
//         { status: 404 }
//       );
//     }

//     if (user.isVerified) {
//       return NextResponse.json(
//         { error: "User is already verified." },
//         { status: 400 }
//       );
//     }

//     const code = generateCode();

//     user.verificationCode = code;
//     user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
//     await user.save();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });


//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Your new verification code",
//       html: `
//         <div style="font-family: sans-serif; direction: ltr;">
//           <h2>Email Verification</h2>
//           <p>Your new verification code is:</p>
//           <h1>${code}</h1>
//           <p>This code will expire in 10 minutes.</p>
//         </div>
//       `,
//     });

//     return NextResponse.json(
//       { message: "Verification code resent successfully." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Resend Code Error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong while resending code." },
//       { status: 500 }
//     );
//   }
// }
