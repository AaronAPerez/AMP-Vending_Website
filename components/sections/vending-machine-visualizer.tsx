import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Vending machine options for selection
const VENDING_MACHINES = [
  {
    id: "km-vmrt-50-b",
    name: "Premium Refrigerated Machine",
    model: "KM-VMRT-50-B",
    image: "/images/machines/KM-VMRT-50-B (Premium Refrigerated Machine) bg.png",
    width: 180, // Width in pixels at scale 1
    height: 350, // Height in pixels at scale 1
  },
  {
    id: "km-vmnt-50-b",
    name: "Non-Refrigerated Snack Machine",
    model: "KM-VMNT-50-B",
    image: "/images/machines/KM-VMNT-50-B (Non-Refrigerated Snack Machine) bg.png",
    width: 180,
    height: 350,
  },
  {
    id: "km-vmr-40-b",
    name: "Standard Refrigerated Machine",
    model: "KM-VMR-40-B",
    image: "/images/machines/KM-VMR-40-B (Standard Refrigerated Machine) bg.png",
    width: 150,
    height: 350,
  },
  {
    id: "km-vmr-30-b",
    name: "Compact Refrigerated Machine",
    model: "KM-VMR-30-B",
    image: "/images/machines/KM-VMR-30-B (Compact Refrigerated Machine) bg.png",
    width: 120,
    height: 350,
  }
];

/**
 * Main component for the Vending Machine Visualizer
 */
const VendingMachineVisualizer = () => {
  // State for uploaded image
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageSize, setUploadedImageSize] = useState({ width: 0, height: 0 });
  
  // State for selected machines
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [placedMachines, setPlacedMachines] = useState([]);
  
  // State for machine that's currently being dragged
  const [currentMachine, setCurrentMachine] = useState(null);
  
  // Reference to the canvas/container element
  const canvasRef = useRef(null);
  
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
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      setAccessibilityMessage('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImageSize({
          width: img.width,
          height: img.height
        });
      };
      img.src = event.target.result;
      
      setUploadedImage(event.target.result);
      setPlacedMachines([]);
      setAccessibilityMessage('Image uploaded successfully. You can now add vending machines.');
    };
    
    reader.readAsDataURL(file);
  };
  
  // Toggle machine selection
  const toggleMachineSelection = (machine) => {
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
  const addMachineToCanvas = (machine) => {
    if (!uploadedImage) {
      setAccessibilityMessage('Please upload an image first.');
      return;
    }
    
    // Create a new instance of the machine with position
    const newMachine = {
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
  const handleDragStart = (id) => {
    setIsDragging(true);
    setCurrentMachine(id);
    setAccessibilityMessage('Dragging vending machine. Release to place.');
  };
  
  // Handle drag operation
  const handleDrag = (id, x, y) => {
    setPlacedMachines(prev => prev.map(machine => {
      if (machine.id === id) {
        // Calculate the scaled dimensions
        const scaledWidth = machine.width * machine.scale;
        const scaledHeight = machine.height * machine.scale;
        
        // Keep machine within canvas bounds
        const boundedX = Math.max(0, Math.min(x, canvasSize.width - scaledWidth));
        const boundedY = Math.max(0, Math.min(y, canvasSize.height - scaledHeight));
        
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
  const removePlacedMachine = (id) => {
    setPlacedMachines(prev => {
      const filtered = prev.filter(machine => machine.id !== id);
      setAccessibilityMessage('Vending machine removed from canvas.');
      return filtered;
    });
  };
  
  // Adjust scale of a placed machine
  const adjustMachineScale = (id, scaleChange) => {
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
  const adjustMachineRotation = (id, rotationChange) => {
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
  
  // Add state for download functionality
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Function to download the visualization as an image
  const downloadVisualization = async () => {
    if (!uploadedImage || placedMachines.length === 0) {
      setAccessibilityMessage('Please upload an image and place at least one vending machine before downloading.');
      return;
    }
    
    setIsDownloading(true);
    setAccessibilityMessage('Preparing your visualization for download...');
    
    try {
      // Create a canvas to draw the final visualization
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Create a temporary image to get the proper dimensions
      const bgImage = new Image();
      await new Promise((resolve, reject) => {
        bgImage.onload = resolve;
        bgImage.onerror = reject;
        bgImage.src = uploadedImage;
      });
      
      // Set canvas size to match the uploaded image
      canvas.width = bgImage.width;
      canvas.height = bgImage.height;
      
      // Fill with white background first
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the background image
      ctx.drawImage(bgImage, 0, 0);
      
      // Calculate the scale factor between the display size and actual image size
      const scaleX = canvas.width / canvasSize.width;
      const scaleY = canvas.height / canvasSize.height;
      
      // Draw each placed machine
      for (const machine of placedMachines) {
        const machineImage = new Image();
        await new Promise((resolve, reject) => {
          machineImage.onload = resolve;
          machineImage.onerror = reject;
          machineImage.src = machine.image;
        });
        
        // Scale the position and size for the actual image dimensions
        const scaledX = machine.x * scaleX;
        const scaledY = machine.y * scaleY;
        const scaledWidth = machine.width * machine.scale * scaleX;
        const scaledHeight = machine.height * machine.scale * scaleY;
        
        // Save the context state
        ctx.save();
        
        // Move to the center of where the image will be
        ctx.translate(scaledX + scaledWidth / 2, scaledY + scaledHeight / 2);
        
        // Apply rotation
        ctx.rotate(machine.rotation * Math.PI / 180);
        
        // Draw the machine image
        ctx.drawImage(
          machineImage,
          -scaledWidth / 2,
          -scaledHeight / 2,
          scaledWidth,
          scaledHeight
        );
        
        // Restore the context state
        ctx.restore();
      }
      
      // Convert to data URL and download
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `workplace-vending-visualization-${new Date().toISOString().split('T')[0]}.png`;
      downloadLink.click();
      
      setAccessibilityMessage('Visualization downloaded successfully to your device.');
      
    } catch (error) {
      console.error('Error downloading visualization:', error);
      setAccessibilityMessage('Error downloading visualization. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="flex flex-col bg-[#000000] rounded-lg border border-[#4d4d4d] overflow-hidden text-[#F5F5F5]">
      <div className="p-4 bg-[#4d4d4d]/30 border-b border-[#4d4d4d]">
        <h2 className="text-2xl font-bold text-center">
          Vending Machine Placement Visualizer
        </h2>
        <p className="text-[#A5ACAF] text-center mt-1">
          Upload a photo of your space and see how our premium vending machines will enhance your workplace
        </p>
      </div>
      
      {/* Tutorial overlay - only shown initially */}
      {showTutorial && (
        <div className="p-4 bg-[#FD5A1E]/10 border-b border-[#FD5A1E] text-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">How to use this tool:</h3>
            <button 
              onClick={() => setShowTutorial(false)}
              className="text-[#FD5A1E] hover:underline text-sm"
              aria-label="Close tutorial"
            >
              Dismiss
            </button>
          </div>
          <ol className="list-decimal ml-5 mt-2 space-y-1 text-[#A5ACAF]">
            <li>Upload a photo of your workplace where you want vending machines</li>
            <li>Select up to two machine models from the options below</li>
            <li>Click "Add to Image" to place selected machines on your photo</li>
            <li>Drag to position machines where you want them</li>
            <li>Use the controls to adjust size or remove machines</li>
          </ol>
        </div>
      )}
      
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {/* Left column: Machine selection */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-[#4d4d4d]/30 rounded-lg p-4 border border-[#a4acac]">
            <h3 className="font-bold mb-2">Upload Workplace Image</h3>
            
            <div className="space-y-2">
              <label 
                htmlFor="workplace-image-upload" 
                className="block w-full cursor-pointer bg-[#4d4d4d] hover:bg-[#4d4d4d]/80 text-center py-3 px-4 rounded-lg border border-dashed border-[#a4acac] transition-colors"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
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
                  className="w-full text-sm text-[#FD5A1E] hover:underline"
                  aria-label="Reset and start over"
                >
                  Reset & Start Over
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-[#4d4d4d]/30 rounded-lg p-4 border border-[#a4acac]">
            <h3 className="font-bold mb-2">Select Vending Machines</h3>
            <p className="text-sm text-[#A5ACAF] mb-3">Choose up to 2 machines to add to your space</p>
            
            <div className="space-y-2">
              {VENDING_MACHINES.map(machine => (
                <div 
                  key={machine.id}
                  className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                    selectedMachines.some(m => m.id === machine.id)
                      ? 'border-[#FD5A1E] bg-[#FD5A1E]/10'
                      : 'border-[#a4acac] bg-[#4d4d4d]/50 hover:bg-[#4d4d4d]'
                  }`}
                  onClick={() => toggleMachineSelection(machine)}
                  role="checkbox"
                  aria-checked={selectedMachines.some(m => m.id === machine.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleMachineSelection(machine);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-24 relative flex-shrink-0 bg-[#000000]/50 rounded">
                      <img
                        src={machine.image}
                        alt={machine.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium text-sm">{machine.name}</h4>
                      <p className="text-xs text-[#A5ACAF]">{machine.model}</p>
                    </div>
                    {selectedMachines.some(m => m.id === machine.id) && (
                      <svg className="w-5 h-5 text-[#FD5A1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => {
                if (selectedMachines.length > 0) {
                  selectedMachines.forEach(machine => {
                    const originalMachine = VENDING_MACHINES.find(m => m.id === machine.id);
                    if (originalMachine) {
                      addMachineToCanvas(originalMachine);
                    }
                  });
                } else {
                  setAccessibilityMessage('Please select at least one vending machine.');
                }
              }}
              disabled={!uploadedImage || selectedMachines.length === 0}
              className="mt-4 w-full py-2 px-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg font-medium hover:bg-[#FD5A1E]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Add selected machines to your image"
            >
              Add to Image
            </button>
          </div>
          
          {placedMachines.length > 0 && (
            <div className="bg-[#4d4d4d]/30 rounded-lg p-4 border border-[#a4acac]">
              <h3 className="font-bold mb-2">Your Visualization</h3>
              <div className="space-y-3">
                <button
                  onClick={saveVisualization}
                  className="w-full py-2 px-4 bg-[#FD5A1E] text-[#F5F5F5] rounded-lg font-medium hover:bg-[#FD5A1E]/90 transition-colors"
                  aria-label="Save your visualization as an image"
                >
                  Save Visualization
                </button>
                
                <div className="text-sm text-[#A5ACAF] p-3 bg-[#000000]/30 rounded-lg">
                  <p className="font-medium text-[#F5F5F5] mb-1">Tips:</p>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Drag machines to position them</li>
                    <li>Use controls to adjust size</li>
                    <li>Click the X to remove a machine</li>
                  </ul>
                </div>
                
                <div className="text-center mt-3 text-xs text-[#A5ACAF]">
                  <p>Need help with machine placement?</p>
                  <a href="/contact" className="text-[#FD5A1E] hover:underline">Contact our team</a>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Right column: Visualization canvas */}
        <div className="md:col-span-2 flex flex-col">
          <div
            ref={canvasRef}
            className="relative bg-[#4d4d4d]/20 border border-[#a4acac] rounded-lg flex-1 min-h-[400px] overflow-hidden"
            aria-label="Visualization canvas"
          >
            {!uploadedImage ? (
              <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                <div className="max-w-md">
                  <svg className="w-16 h-16 mx-auto text-[#a4acac] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <h3 className="text-xl font-bold mb-2">Upload a workplace image</h3>
                  <p className="text-[#A5ACAF]">
                    Upload a photo of your workspace to see how our premium vending machines will look in your environment.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Background image */}
                <img 
                  src={uploadedImage} 
                  alt="Your workplace" 
                  className="absolute inset-0 w-full h-full object-contain"
                />
                
                {/* Placed machines */}
                {placedMachines.map((machine) => {
                  // Calculate the scaled dimensions
                  const scaledWidth = machine.width * machine.scale;
                  const scaledHeight = machine.height * machine.scale;
                  
                  return (
                    <motion.div
                      key={machine.id}
                      className="absolute cursor-move"
                      style={{
                        x: machine.x,
                        y: machine.y,
                        width: scaledWidth,
                        height: scaledHeight,
                        rotate: machine.rotation,
                        zIndex: machine.id === currentMachine ? 10 : 1,
                      }}
                      drag
                      dragMomentum={false}
                      onDragStart={() => handleDragStart(machine.id)}
                      onDrag={(_, info) => handleDrag(machine.id, info.point.x - (scaledWidth / 2), info.point.y - (scaledHeight / 2))}
                      onDragEnd={handleDragEnd}
                      whileDrag={{ opacity: 0.8 }}
                    >
                      {/* Machine image */}
                      <img
                        src={machine.image}
                        alt={machine.name}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                      
                      {/* Controls - visible when machine is current or not dragging */}
                      {(machine.id === currentMachine || !isDragging) && (
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#000000]/80 rounded-t-lg p-1 flex items-center space-x-1">
                          <button
                            onClick={() => adjustMachineScale(machine.id, -0.1)}
                            className="p-1 text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors"
                            aria-label="Decrease size"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => adjustMachineScale(machine.id, 0.1)}
                            className="p-1 text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors"
                            aria-label="Increase size"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        
                        <button
                          onClick={() => adjustMachineRotation(machine.id, -15)}
                          className="p-1 text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors"
                          aria-label="Rotate counterclockwise"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => adjustMachineRotation(machine.id, 15)}
                          className="p-1 text-[#F5F5F5] hover:text-[#FD5A1E] transition-colors"
                          aria-label="Rotate clockwise"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => removePlacedMachine(machine.id)}
                          className="p-1 text-red-400 hover:text-red-500 transition-colors"
                          aria-label="Remove this machine"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Instructions overlay - shown if image is uploaded but no machines placed */}
                {uploadedImage && placedMachines.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-center bg-[#000000]/40 pointer-events-none p-4">
                    <div className="bg-[#000000]/80 rounded-lg p-4 max-w-md">
                      <p className="text-lg font-bold mb-2">
                        Select machines and click "Add to Image"
                      </p>
                      <p className="text-[#A5ACAF]">
                        Choose from our premium vending machines and see how they'll look in your space
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Accessibility messages */}
          <div 
            className="mt-4 p-3 bg-[#4d4d4d]/30 border border-[#a4acac] rounded-lg text-sm text-[#A5ACAF]"
            aria-live="polite"
            role="status"
          >
            <p className="flex items-start">
              <svg className="w-5 h-5 text-[#FD5A1E] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {accessibilityMessage || 
                 "Welcome to the Vending Machine Visualizer. Upload an image of your workplace to get started."}
              </span>
            </p>
          </div>
          
          {/* Zero-cost reminder */}
          <div className="mt-4 p-4 bg-[#FD5A1E]/10 border border-[#FD5A1E] rounded-lg">
            <h3 className="font-bold flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Zero Cost Installation
            </h3>
            <p className="text-sm text-[#A5ACAF] mt-1">
              Remember: All our vending machines come with zero upfront costs and include complete maintenance service. We handle everything so you can focus on your business.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="p-4 bg-[#4d4d4d]/30 border-t border-[#4d4d4d] mt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Ready to enhance your workplace?</h3>
            <p className="text-[#A5ACAF]">
              Contact us to arrange a free consultation or request a custom visualization
            </p>
          </div>
          <div className="flex space-x-4">
            <a 
              href="/contact" 
              className="px-6 py-3 bg-[#FD5A1E] text-[#F5F5F5] rounded-full font-medium hover:bg-[#FD5A1E]/90 transition-colors"
            >
              Schedule Consultation
            </a>
            <a 
              href="/proposal" 
              className="px-6 py-3 border border-[#a4acac] text-[#F5F5F5] rounded-full font-medium hover:bg-[#4d4d4d] transition-colors"
            >
              View Proposal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendingMachineVisualizer;