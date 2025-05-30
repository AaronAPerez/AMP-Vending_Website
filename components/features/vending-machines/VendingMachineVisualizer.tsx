'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getAllVendingMachines } from '@/lib/data/vendingMachineData';
import { Icon } from '@/components/ui/Icons';
import { HeroHighlight } from '@/components/ui/hero-highlight';
import useHeroHighlight from '@/hooks/useHeroHighlight';

/**
 * Interface for machine data structure
 */
interface Machine {
  id: string;
  name: string;
  model: string;
  image: string;
  width: number;
  height: number;
}

/**
 * Interface for a positioned machine on the canvas
 */
interface PlacedMachine extends Machine {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

/**
 * Props for the machine control buttons
 */
interface MachineControlsProps {
  machineId: string;
  onScaleDecrease: (id: string) => void;
  onScaleIncrease: (id: string) => void;
  onRotateLeft: (id: string) => void;
  onRotateRight: (id: string) => void;
  onRemove: (id: string) => void;
}

/**
 * Props for the machine selection item
 */
interface MachineSelectionItemProps {
  machine: Machine;
  isSelected: boolean;
  onToggle: (machine: Machine) => void;
}

/**
 * MachineControls Component
 */
const MachineControls: React.FC<MachineControlsProps> = ({
  machineId,
  onScaleDecrease,
  onScaleIncrease,
  onRotateLeft,
  onRotateRight,
  onRemove
}) => {
  return (
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary-black/80 rounded-t-lg p-1 flex items-center space-x-1">
      <button
        onClick={() => onScaleDecrease(machineId)}
        className="p-1 text-whitesmoke hover:text-orange transition-colors"
        aria-label="Decrease size"
      >
        <Icon name="options" size={16} />
      </button>
      
      <button
        onClick={() => onScaleIncrease(machineId)}
        className="p-1 text-whitesmoke hover:text-orange transition-colors"
        aria-label="Increase size"
      >
        <Icon name="options" size={16} />
      </button>
      
      <button
        onClick={() => onRotateLeft(machineId)}
        className="p-1 text-whitesmoke hover:text-orange transition-colors"
        aria-label="Rotate counterclockwise"
      >
        <Icon name="technology" size={16} />
      </button>
      
      <button
        onClick={() => onRotateRight(machineId)}
        className="p-1 text-whitesmoke hover:text-orange transition-colors"
        aria-label="Rotate clockwise"
      >
        <Icon name="technology" size={16} />
      </button>
      
      <button
        onClick={() => onRemove(machineId)}
        className="p-1 text-red-400 hover:text-red-500 transition-colors"
        aria-label="Remove this machine"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

/**
 * MachineSelectionItem Component
 */
const MachineSelectionItem: React.FC<MachineSelectionItemProps> = ({ machine, isSelected, onToggle }) => {
  const {
    ref,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useHeroHighlight({ enabled: isSelected });
  
  return (
    <div 
      ref={ref}
      className={`p-2 border rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? 'border-orange bg-orange/10'
          : 'border-edward-gray bg-dark-gray/50 hover:bg-dark-gray'
      }`}
      onClick={() => onToggle(machine)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(machine);
        }
      }}
    >
      <div className="flex items-center">
        <div className="w-12 h-24 relative flex-shrink-0 bg-primary-black/50 rounded">
          <Image
            src={machine.image}
            alt={machine.name}
            width={48}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="ml-3 flex-1">
          <h4 className="font-medium text-sm">{machine.name}</h4>
          <p className="text-xs text-silver">{machine.model}</p>
        </div>
        {isSelected && (
          <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  );
};

/**
 * Main component for the Vending Machine Visualizer
 */
const VendingMachineVisualizer: React.FC = () => {
  // Load all vending machines
  const vendingMachines = getAllVendingMachines().map(machine => ({
    id: machine.id,
    name: machine.name,
    model: machine.model,
    image: machine.images[0]?.src || '/images/placeholder-machine.png',
    width: 200, // Default width - you can adjust or fetch from data
    height: 400, // Default height - you can adjust or fetch from data
  }));
  
  // State for uploaded image
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [, setUploadedImageSize] = useState({ width: 0, height: 0 });
  
  // State for selected machines
  const [selectedMachines, setSelectedMachines] = useState<Machine[]>([]);
  
  // State for placed machines
  const [placedMachines, setPlacedMachines] = useState<PlacedMachine[]>([]);
  
  // State for machine that's currently being dragged
  const [currentMachine, setCurrentMachine] = useState<string | null>(null);
  
  // Reference to the canvas/container element
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // State for the canvas size
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  
  // Track if a machine is being dragged
  const [isDragging, setIsDragging] = useState(false);
  
  // State for accessibility messages
  const [accessibilityMessage, setAccessibilityMessage] = useState('');
  
  // State for tutorial visibility
  const [showTutorial, setShowTutorial] = useState(true);
  
  // Initialize canvas size when component mounts
  useEffect(() => {
    if (canvasRef.current) {
      updateCanvasSize();
      
      // Add resize listener
      window.addEventListener('resize', updateCanvasSize);
      
      // Clean up
      return () => {
        window.removeEventListener('resize', updateCanvasSize);
      };
    }
  }, [uploadedImage]);
  
  // Update canvas size
  const updateCanvasSize = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCanvasSize({
        width: rect.width,
        height: rect.height
      });
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      setAccessibilityMessage('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        setUploadedImageSize({
          width: img.width,
          height: img.height
        });
      };
      if (event.target && typeof event.target.result === 'string') {
        img.src = event.target.result;
      }
      
      if (event.target && event.target.result) {
        setUploadedImage(event.target.result as string);
      }
      setPlacedMachines([]);
      setAccessibilityMessage('Image uploaded successfully. You can now add vending machines.');
    };
    
    reader.readAsDataURL(file);
  };
  
  // Toggle machine selection
  const toggleMachineSelection = (machine: Machine) => {
    setSelectedMachines(prev => {
      // Check if the machine is already selected
      const isSelected = prev.some(m => m.id === machine.id);
      
      if (isSelected) {
        // Remove from selection
        setAccessibilityMessage(`${machine.name} removed from selection`);
        return prev.filter(m => m.id !== machine.id);
      } else {
        // Add to selection (max 2 machines)
        if (prev.length >= 2) {
          setAccessibilityMessage('You can only select up to 2 machines at a time. Please deselect one first.');
          return prev;
        }
        
        setAccessibilityMessage(`${machine.name} added to selection`);
        return [...prev, machine];
      }
    });
  };
  
  // Add a selected machine to the canvas
  const addMachineToCanvas = (machine: Machine) => {
    if (!uploadedImage) {
      setAccessibilityMessage('Please upload an image first.');
      return;
    }
    
    // Create a new instance of the machine with position
    const newMachine: PlacedMachine = {
      ...machine,
      id: `${machine.id}-${Date.now()}`, // Unique ID
      x: Math.max(0, (canvasSize.width / 2) - (machine.width / 2)),
      y: Math.max(0, (canvasSize.height / 2) - (machine.height / 2)),
      scale: 1,
      rotation: 0,
    };
    
    setPlacedMachines(prev => [...prev, newMachine]);
    setAccessibilityMessage(`${machine.name} placed in the center of the image. Drag to position it.`);
  };
  
  // Handle starting a drag operation
  const handleDragStart = (id: string) => {
    setIsDragging(true);
    setCurrentMachine(id);
    setAccessibilityMessage('Dragging vending machine. Release to place.');
  };
  
  // Handle drag operation
  const handleDrag = (id: string, x: number, y: number) => {
    setPlacedMachines(prev => prev.map(machine => {
      if (machine.id === id) {
        // Keep machine within canvas bounds
        const boundedX = Math.max(0, Math.min(x, canvasSize.width - machine.width * machine.scale));
        const boundedY = Math.max(0, Math.min(y, canvasSize.height - machine.height * machine.scale));
        
        return {
          ...machine,
          x: boundedX,
          y: boundedY
        };
      }
      return machine;
    }));
  };
  
  // Handle end of drag
  const handleDragEnd = () => {
    setIsDragging(false);
    setCurrentMachine(null);
    setAccessibilityMessage('Vending machine placed. You can continue to adjust its position by dragging.');
  };
  
  // Remove a placed machine
  const removePlacedMachine = (id: string) => {
    setPlacedMachines(prev => {
      const filtered = prev.filter(machine => machine.id !== id);
      setAccessibilityMessage('Vending machine removed from canvas.');
      return filtered;
    });
  };
  
  // Adjust scale of a placed machine
  const adjustMachineScale = (id: string, scaleChange: number) => {
    setPlacedMachines(prev => prev.map(machine => {
      if (machine.id === id) {
        // Limit scale to reasonable bounds
        const newScale = Math.max(0.5, Math.min(1.5, machine.scale + scaleChange));
        setAccessibilityMessage(`Vending machine ${scaleChange > 0 ? 'enlarged' : 'reduced'} to ${Math.round(newScale * 100)}% size.`);
        
        return {
          ...machine,
          scale: newScale
        };
      }
      return machine;
    }));
  };
  
  // Adjust rotation of a placed machine
  const adjustMachineRotation = (id: string, rotationChange: number) => {
    setPlacedMachines(prev => prev.map(machine => {
      if (machine.id === id) {
        const newRotation = machine.rotation + rotationChange;
        setAccessibilityMessage(`Vending machine rotated ${rotationChange > 0 ? 'clockwise' : 'counterclockwise'}.`);
        
        return {
          ...machine,
          rotation: newRotation
        };
      }
      return machine;
    }));
  };
  
  // Reset everything
  const resetVisualizer = () => {
    setUploadedImage(null);
    setPlacedMachines([]);
    setSelectedMachines([]);
    setAccessibilityMessage('Visualizer reset. You can upload a new image.');
  };
  
  // Save the visualization as an image
  const saveVisualization = () => {
    // This is a simple approach - for a production version, you'd want to use
    // a proper HTML-to-image library like html2canvas
    setAccessibilityMessage('Saving is not implemented in this demo. In a full version, this would save your visualization as an image.');
    alert('In the full version, this would save your visualization as an image that you could download or share.');
  };
  
  return (
    <HeroHighlight containerClassName="flex flex-col bg-primary-black rounded-xl border border-dark-gray overflow-hidden text-whitesmoke">
      <div className="p-4 bg-dark-gray/30 border-b border-dark-gray">
        <h2 className="text-2xl font-bold text-center">
          Vending Machine Placement Visualizer
        </h2>
        <p className="text-silver text-center mt-1">
          Upload a photo of your space and see how our premium vending machines will enhance your workplace
        </p>
      </div>
      
      {/* Tutorial overlay - only shown initially */}
      {showTutorial && (
        <div className="p-4 bg-orange/10 border-b border-orange text-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">How to use this tool:</h3>
            <button 
              onClick={() => setShowTutorial(false)}
              className="text-orange hover:underline text-sm"
              aria-label="Close tutorial"
            >
              Dismiss
            </button>
          </div>
          <ol className="list-decimal ml-5 mt-2 space-y-1 text-silver">
            <li>Upload a photo of your workplace where you want vending machines</li>
            <li>Select up to two machine models from the options below</li>
            <li>Click `&quot;Add to Imag`&quot; to place selected machines on your photo</li>
            <li>Drag to position machines where you want them</li>
            <li>Use the controls to adjust size or remove machines</li>
          </ol>
        </div>
      )}
      
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {/* Left column: Machine selection */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-dark-gray/30 rounded-lg p-4 border border-edward-gray">
            <h3 className="font-bold mb-2">Upload Workplace Image</h3>
            
            <div className="space-y-2">
              <label 
                htmlFor="workplace-image-upload" 
                className="block w-full cursor-pointer bg-dark-gray hover:bg-dark-gray/80 text-center py-3 px-4 rounded-lg border border-dashed border-edward-gray transition-colors"
              >
                <span className="flex items-center justify-center">
                  <Icon name="technology" size={20} className="mr-2 text-orange" />
                  {uploadedImage ? 'Change Image' : 'Upload Image'}
                </span>
              </label>
              <input 
                type="file"
                id="workplace-image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Upload image of your workplace"
              />
              {uploadedImage && (
                <button
                  onClick={resetVisualizer}
                  className="w-full text-sm text-orange hover:underline"
                  aria-label="Reset and start over"
                >
                  Reset & Start Over
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-dark-gray/30 rounded-lg p-4 border border-edward-gray">
            <h3 className="font-bold mb-2">Select Vending Machines</h3>
            <p className="text-sm text-silver mb-3">Choose up to 2 machines to add to your space</p>
            
            <div className="space-y-2">
              {vendingMachines.map(machine => (
                <MachineSelectionItem
                  key={machine.id}
                  machine={machine}
                  isSelected={selectedMachines.some(m => m.id === machine.id)}
                  onToggle={toggleMachineSelection}
                />
              ))}
            </div>
            
            <button
              onClick={() => {
                if (selectedMachines.length > 0) {
                  selectedMachines.forEach(machine => {
                    addMachineToCanvas(machine);
                  });
                } else {
                  setAccessibilityMessage('Please select at least one vending machine.');
                }
              }}
              disabled={!uploadedImage || selectedMachines.length === 0}
              className="mt-4 w-full py-2 px-4 bg-orange text-whitesmoke rounded-lg font-medium hover:bg-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Add selected machines to your image"
            >
              Add to Image
            </button>
          </div>
          
          {placedMachines.length > 0 && (
            <div className="bg-dark-gray/30 rounded-lg p-4 border border-edward-gray">
              <h3 className="font-bold mb-2">Your Visualization</h3>
              <div className="space-y-3">
                <button
                  onClick={saveVisualization}
                  className="w-full py-2 px-4 bg-orange text-whitesmoke rounded-lg font-medium hover:bg-orange/90 transition-colors"
                  aria-label="Save your visualization as an image"
                >
                  Save Visualization
                </button>
                
                <div className="text-sm text-silver p-3 bg-primary-black/30 rounded-lg">
                  <p className="font-medium text-whitesmoke mb-1">Tips:</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Drag machines to position them</li>
                    <li>Use controls to adjust size</li>
                    <li>Click the X to remove a machine</li>
                  </ul>
                </div>
                
                <div className="text-center mt-3 text-xs text-silver">
                  <p>Need help with machine placement?</p>
                  <a href="/contact" className="text-orange hover:underline">Contact our team</a>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right column: Visualization canvas */}
        <div className="md:col-span-2 flex flex-col">
          <div
            ref={canvasRef}
            className="relative bg-dark-gray/20 border border-edward-gray rounded-lg flex-1 min-h-[400px] overflow-hidden"
            aria-label="Visualization canvas"
          >
            {!uploadedImage ? (
              <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                <div className="max-w-md">
                  <div className="w-16 h-16 mx-auto text-edward-gray mb-4">
                    <Icon name="technology" size={64} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Upload a workplace image</h3>
                  <p className="text-silver">
                    Upload a photo of your workspace to see how our premium vending machines will look in your environment.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Background image */}
                <Image
                  src={uploadedImage} 
                  alt="Your workplace" 
                  className="absolute inset-0 w-full h-full object-contain"
                />
                
                {/* Placed machines */}
                {placedMachines.map((machine) => (
                  <motion.div
                    key={machine.id}
                    className="absolute cursor-move"
                    style={{
                      x: machine.x,
                      y: machine.y,
                      width: machine.width * machine.scale,
                      height: machine.height * machine.scale,
                      rotate: machine.rotation,
                      zIndex: machine.id === currentMachine ? 10 : 1,
                    }}
                    drag
                    dragMomentum={false}
                    onDragStart={() => handleDragStart(machine.id)}
                    onDrag={(_, info) => handleDrag(machine.id, info.point.x - (machine.width * machine.scale / 2), info.point.y - (machine.height * machine.scale / 2))}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ opacity: 0.8 }}
                  >
                    {/* Machine image */}
                    <Image
                      src={machine.image}
                      alt={machine.name}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                    
                    {/* Controls - visible when machine is current or not dragging */}
                    {(machine.id === currentMachine || !isDragging) && (
                      <MachineControls
                        machineId={machine.id}
                        onScaleDecrease={(id) => adjustMachineScale(id, -0.1)}
                        onScaleIncrease={(id) => adjustMachineScale(id, 0.1)}
                        onRotateLeft={(id) => adjustMachineRotation(id, -15)}
                        onRotateRight={(id) => adjustMachineRotation(id, 15)}
                        onRemove={removePlacedMachine}
                      />
                    )}
                  </motion.div>
                ))}
                
                {/* Instructions overlay - shown if image is uploaded but no machines placed */}
                {uploadedImage && placedMachines.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-center bg-primary-black/40 pointer-events-none p-4">
                    <div className="bg-primary-black/80 rounded-lg p-4 max-w-md">
                      <p className="text-lg font-bold mb-2">
                        Select machines and click &quot;Add to Image&quot;
                      </p>
                      <p className="text-silver">
                        Choose from our premium vending machines and see how they`&apos;ll look in your space
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Accessibility messages */}
          <div 
            className="mt-4 p-3 bg-dark-gray/30 border border-edward-gray rounded-lg text-sm text-silver"
            aria-live="polite"
            role="status"
          >
            <p className="flex items-start">
              <Icon name="options" size={20} className="text-orange mr-2 flex-shrink-0" />
              <span>
                {accessibilityMessage || 
                 "Welcome to the Vending Machine Visualizer. Upload an image of your workplace to get started."}
              </span>
            </p>
          </div>
          
          {/* Zero-cost reminder */}
          <div className="mt-4 p-4 bg-orange/10 border border-orange rounded-lg">
            <h3 className="font-bold flex items-center">
              <Icon name="payment" size={20} className="mr-2" />
              Zero Cost Installation
            </h3>
            <p className="text-sm text-silver mt-1">
              Remember: All our vending machines come with zero upfront costs and include complete maintenance service. We handle everything so you can focus on your business.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="p-4 bg-dark-gray/30 border-t border-dark-gray mt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Ready to enhance your workplace?</h3>
            <p className="text-silver">
              Contact us to arrange a free consultation or request a custom visualization
            </p>
          </div>
          <div className="flex space-x-4">
            <a 
              href="/contact" 
              className="px-6 py-3 bg-orange text-whitesmoke rounded-full font-medium hover:bg-orange/90 transition-colors"
            >
              Schedule Consultation
            </a>
            <a 
              href="/proposal" 
              className="px-6 py-3 border border-edward-gray text-whitesmoke rounded-full font-medium hover:bg-dark-gray transition-colors"
            >
              View Proposal
            </a>
          </div>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default VendingMachineVisualizer;