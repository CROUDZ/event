"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ImageSectionProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  position?: "left" | "right" | "center";
}

export function ImageSection({
  src,
  alt,
  title,
  description,
  position = "center",
}: ImageSectionProps) {
  return (
    <motion.section
      className="py-20 px-4 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`flex flex-col ${
            position === "left"
              ? "md:flex-row"
              : position === "right"
                ? "md:flex-row-reverse"
                : "items-center"
          } gap-12 items-center`}
        >
          <motion.div
            className="flex-1"
            initial={{
              opacity: 0,
              x: position === "left" ? -50 : position === "right" ? 50 : 0,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={src}
                alt={alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {(title || description) && (
            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{
                opacity: 0,
                x: position === "left" ? 50 : position === "right" ? -50 : 0,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {title && (
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {description}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

export default ImageSection;
