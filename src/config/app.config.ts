// this.app.use("/uploads", (req: Request, res: Response, next: NextFunction) => {
//   const mode = req.query.mode as string;
//   try {
//     const data = jwt.verify(req.query.token as string, process.env.JWT_SECRET!);

//     //   @ts-ignore
//     let file = req?.url
//       ?.split("/?mode=")[0]
//       .replace("%20", " ")
//       .replace("%3E", ".");
//     const path = join(process.cwd(), "public", "uploads", file as string);
//     res.sendFile(path);
//   } catch (err) {
//     throw new Error("You are not authorized to view this resource");
//   }
// });
