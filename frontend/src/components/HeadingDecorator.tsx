import React from 'react';
import { Leaf } from 'lucide-react';

interface HeadingDecoratorProps {
  align?: 'left' | 'center';
}

export default function HeadingDecorator({ align = 'center' }: HeadingDecoratorProps) {
  if (align === 'center') {
    return (
      <div className="flex items-center justify-center gap-2.5 mt-4 mb-8">
        <div className="h-[1.5px] w-10 bg-[#dcae3d]" />
        <Leaf className="w-3.5 h-3.5 text-[#dcae3d] fill-[#dcae3d] -rotate-45" />
        <div className="h-[1.5px] w-10 bg-[#dcae3d]" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 mt-4 mb-6">
      <div className="h-[1.5px] w-8 bg-[#dcae3d]" />
      <Leaf className="w-3.5 h-3.5 text-[#dcae3d] fill-[#dcae3d] -rotate-45" />
      <div className="h-[1.5px] w-8 bg-[#dcae3d]" />
    </div>
  );
}
