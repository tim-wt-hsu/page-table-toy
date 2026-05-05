import React, { useState, useEffect, Fragment, useCallback, useRef } from 'react';
import './index.css';

const KB = 1024n;
    const MB = 1024n * KB;
    const GB = 1024n * MB;

    const Database = ({ className="w-4 h-4" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>;
    const Cpu = ({ className="w-4 h-4" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>;
    const Layers = ({ className="text-stone-700 w-7 h-7" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>;
    const EditIcon = ({ className="w-4 h-4" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
    const SettingsIcon = ({ className="w-4 h-4" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
    const PlusCircle = ({ className="w-5 h-5" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
    const ChevronRight = ({ className="w-4 h-4" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
    const ChevronDown = ({ className="w-4 h-4" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
    const AlertTriangle = ({ className="w-16 h-16 text-red-400 mb-4" }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
    const ZoomInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
    const ZoomOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

    const SCALES = {
       'SV32': [
           { label: '16GB (Macro View)', value: 16n * GB },
           { label: '256MB (Megapage View)', value: 256n * MB },
           { label: '256KB (Micro View)', value: 256n * KB }
       ],
       'SV39': [
           { label: '2TB (Macro View)', value: 2048n * GB },
           { label: '16GB (Gigapage View)', value: 16n * GB },
           { label: '256MB (Megapage View)', value: 256n * MB },
           { label: '256KB (Micro View)', value: 256n * KB }
       ]
    };

    const generateEmptyDB = () => {
      const createEmptyTable = (numEntries) => 
        Array.from({ length: numEntries }, (_, i) => ({
          index: i, v: 0, r: 0, w: 0, x: 0, u: 0, g: 0, a: 0, d: 0, rsw: 0, pbmt: 0, n: 0, ppn: 0, desc: 'Unallocated'
        }));

      return {
        SV32: { 
            SATP_PPN: 0x200000, 
            tables: { 0x200000: createEmptyTable(1024) } 
        },
        SV39: { 
            SATP_PPN: 0x10000000, 
            tables: { 0x10000000: createEmptyTable(512) } 
        }
      };
    };

    const generateDemoDB = () => {
      const createEntry = (index, ppn, isLeaf = true, desc = '') => ({
        index,
        v: 1, r: isLeaf?1:0, w: isLeaf?1:0, x: isLeaf?1:0, u: 0, g: 0, a: 1, d: 1, 
        rsw: 0, pbmt: 0, n: 0, ppn: ppn, desc: desc || (isLeaf ? `Map to 0x${(BigInt(ppn) << 12n).toString(16).toUpperCase()}` : `Next-level table`)
      });

      // SV32 Configuration
      // Root (Level 1) at 8GB (0x200000)
      const sv32Root = [];
      for (let i = 0; i < 1024; i++) {
          if (i === 1) {
              sv32Root.push(createEntry(i, 0x200001, false, "Next-level Table (L0)"));
          } else {
              // Each entry covers 4MB. For index i to map to i * 4MB:
              // PA = i * 4MB = i * 2^22. PPN = PA >> 12 = i * 2^10 = i * 1024.
              sv32Root.push(createEntry(i, i * 1024, true, "4MB Page"));
          }
      }

      // Level 0 Table at 8GB + 4KB (0x200001)
      const sv32L0 = [];
      for (let i = 0; i < 1024; i++) {
          // Map to 2MB + (i * 4KB). PPN = (2*1024*1024 + i*4096) >> 12 = 512 + i.
          sv32L0.push(createEntry(i, 512 + i, true, "4KB Page"));
      }

      // SV39 Configuration
      const sv39Root = [];
      for (let i = 0; i < 512; i++) {
          if (i === 1) {
              sv39Root.push(createEntry(i, 0x10000001, false, "Next-level Table (L1)"));
          } else {
              sv39Root.push(createEntry(i, i * 0x40000, true, "1GB Page"));
          }
      }

      const sv39L1 = [];
      for (let i = 0; i < 512; i++) {
          if (i === 1) {
              sv39L1.push(createEntry(i, 0x10000002, false, "Next-level Table (L0)"));
          } else {
              sv39L1.push(createEntry(i, 0x40000 + (i * 0x200), true, "2MB Page"));
          }
      }

      const sv39L0 = [];
      for (let i = 0; i < 512; i++) {
          sv39L0.push(createEntry(i, 0x40200 + i, true, "4KB Page"));
      }

      return {
        SV32: { 
            SATP_PPN: 0x200000, 
            tables: { 
                0x200000: sv32Root, 
                0x200001: sv32L0
            } 
        },
        SV39: { 
            SATP_PPN: 0x10000000, 
            tables: { 
                0x10000000: sv39Root, 
                0x10000001: sv39L1,
                0x10000002: sv39L0
            } 
        }
      };
    };

    const INITIAL_DB = generateEmptyDB();

    function App() {
      const [mode, setMode] = useState('SV39');
      const [vaInput, setVaInput] = useState('00000000');
      const [memoryDB, setMemoryDB] = useState(INITIAL_DB);
      
      const [explorerPath, setExplorerPath] = useState([INITIAL_DB['SV39'].SATP_PPN]); 
      const [currentStep, setCurrentStep] = useState(0);    
      const [selectedEntry, setSelectedEntry] = useState(null); 
      const [translationResult, setTranslationResult] = useState(null);
      const [editingPte, setEditingPte] = useState(null);
      const [bitDiagramMode, setBitDiagramMode] = useState(0); // 0: Hex Seg, 1: Dec Seg, 2: Bin Seg, 3: Full Hex, 4: Full Dec, 5: Full Bin
      const [bulkEditTableInfo, setBulkEditTableInfo] = useState(null); 
      const [relocatingTable, setRelocatingTable] = useState(null); // { oldPpn, currentStep, newPaInput }

      const [scaleIndex, setScaleIndex] = useState(3); 
      const [showAllMappings, setShowAllMappings] = useState(true); 
      const [scrollRatio, setScrollRatio] = useState(0); 

      const [indexFormat, setIndexFormat] = useState('DEC');
      const [showGuide, setShowGuide] = useState(false);
      const [ppnFormat, setPpnFormat] = useState('SEP_HEX');
      const [pteFormat, setPteFormat] = useState('HEX');

      const mapRef = useRef(null);
      const maxScrollPaRef = useRef(0n);

      // Removed custom wheel listener to use native scrolling

      const safeScaleIndex = Math.min(scaleIndex, SCALES[mode].length - 1);

      useEffect(() => {
        const rootPpn = memoryDB[mode].SATP_PPN;
        setExplorerPath([rootPpn]);
        setCurrentStep(0);
        setSelectedEntry(null);
        setTranslationResult(null);
        setScaleIndex(SCALES[mode].length - 1); 
        setVaInput(mode === 'SV39' ? '00000000' : '00000000');
      }, [mode]);

      useEffect(() => {
        let focusPa = null;
        
        if (translationResult && translationResult.status === 'success') {
            focusPa = BigInt(translationResult.pa);
        } else if (selectedEntry && selectedEntry.v === 1 && selectedEntry.ppn != null && isLeaf(selectedEntry)) {
            const size = getEntrySize(mode, currentStep);
            focusPa = (BigInt(selectedEntry.ppn) * 4096n) + (size / 2n);
        } else if (explorerPath[currentStep] != null) {
            focusPa = (BigInt(explorerPath[currentStep]) * 4096n) + 2048n;
        }

        if (focusPa !== null) {
            const maxPa = mode === 'SV32' ? 16n * GB : 2048n * GB;
            const currentScale = SCALES[mode][safeScaleIndex].value;
            const maxScrollPa = maxPa > currentScale ? maxPa - currentScale : 0n;
            
            if (maxScrollPa > 0n) {
                let idealStart = focusPa - (currentScale / 2n);
                if (idealStart < 0n) idealStart = 0n;
                if (idealStart > maxScrollPa) idealStart = maxScrollPa;
                
                const newRatio = Number(idealStart) / Number(maxScrollPa);
                setScrollRatio(newRatio);
            } else {
                setScrollRatio(0);
            }
        }
      }, [translationResult, selectedEntry, mode, safeScaleIndex, currentStep, explorerPath]);

      const maxStep = mode === 'SV32' ? 1 : 2;
      const isPointer = (pte, step) => pte?.v === 1 && pte?.r === 0 && pte?.w === 0 && pte?.x === 0 && step < maxStep;
      const isLeaf = (pte) => pte?.v === 1 && (pte?.r === 1 || pte?.w === 1 || pte?.x === 1);
      const isInvalid = (pte, step) => pte?.v === 0 || (pte?.v === 1 && pte?.r === 0 && pte?.w === 0 && pte?.x === 0 && step >= maxStep);

      const getEntrySize = (sysMode, step) => {
        if (sysMode === 'SV32') {
            return step === 0 ? 4n * MB : 4096n; 
        } else {
            return step === 0 ? 1n * GB : (step === 1 ? 2n * MB : 4096n); 
        }
      };

      const getOptimalScaleIndexForLeaf = (sysMode, step) => {
        if (sysMode === 'SV32') {
            return step === 0 ? 1 : 2; 
        } else {
            if (step === 0) return 1; 
            if (step === 1) return 2; 
            return 3; 
        }
      };

      const cleanupOrphanedTables = (db, currentMode) => {
        const rootPpn = db[currentMode].SATP_PPN;
        const tables = db[currentMode].tables;
        
        const reachable = new Set([rootPpn.toString()]);
        const queue = [{ ppn: rootPpn, level: 1 }];
        const maxLevel = currentMode === 'SV32' ? 2 : 3;

        while (queue.length > 0) {
            const { ppn, level } = queue.shift();
            const table = tables[ppn];
            if (table) {
                table.forEach(entry => {
                    if (entry.v === 1 && entry.r === 0 && entry.w === 0 && entry.x === 0 && level < maxLevel) {
                        if (entry.ppn != null) {
                            const nextPpnStr = entry.ppn.toString();
                            if (!reachable.has(nextPpnStr)) {
                                reachable.add(nextPpnStr);
                                queue.push({ ppn: entry.ppn, level: level + 1 });
                            }
                        }
                    }
                });
            }
        }

        const newTables = {};
        Object.keys(tables).forEach(ppnStr => {
            if (reachable.has(ppnStr)) {
                newTables[ppnStr] = tables[ppnStr];
            }
        });

        return {
            ...db,
            [currentMode]: {
                ...db[currentMode],
                tables: newTables
            }
        };
      };

      const resetToEmpty = () => {
          const emptyDB = generateEmptyDB();
          setMemoryDB(emptyDB);
          setExplorerPath([emptyDB[mode].SATP_PPN]);
          setCurrentStep(0);
          setSelectedEntry(null);
          setTranslationResult(null);
      };

      const loadDemo = () => {
          const demoDB = generateDemoDB();
          setMemoryDB(demoDB);
          setExplorerPath([demoDB[mode].SATP_PPN]);
          setCurrentStep(0);
          setSelectedEntry(null);
          setTranslationResult(null);
      };

      const handleRowClick = (entry) => {
        setTranslationResult(null); 
        setSelectedEntry(entry);

        if (isPointer(entry, currentStep)) {
          const newPath = explorerPath.slice(0, currentStep + 1);
          newPath.push(entry.ppn);
          setExplorerPath(newPath);
          setCurrentStep(currentStep + 1);
          setSelectedEntry(null);
          setScaleIndex(SCALES[mode].length - 1);
        } else if (isLeaf(entry)) {
          // Truncate path if we select a leaf at a higher level
          if (explorerPath.length > currentStep + 1) {
            setExplorerPath(explorerPath.slice(0, currentStep + 1));
          }
          setScaleIndex(getOptimalScaleIndexForLeaf(mode, currentStep));
        }
      };

      const handleBreadcrumbClick = (stepIndex) => {
        // Truncate the path when navigating back
        setExplorerPath(explorerPath.slice(0, stepIndex + 1));
        setCurrentStep(stepIndex);
        setSelectedEntry(null);
        setTranslationResult(null);
        setScaleIndex(SCALES[mode].length - 1);
      };

      const translateVaToPa = useCallback(() => {
        let vaHex = vaInput.trim().toLowerCase();
        if (!vaHex.startsWith('0x')) vaHex = '0x' + vaHex;

        let va;
        try { va = BigInt(vaHex); } catch (e) { return; }

        const db = memoryDB[mode];
        const tables = db.tables;
        let currentPpn = db.SATP_PPN;
        
        let levels = mode === 'SV32' ? 2 : 3;
        let vpns = mode === 'SV32' 
            ? [Number((va >> 12n) & 0x3FFn), Number((va >> 22n) & 0x3FFn)]
            : [Number((va >> 12n) & 0x1FFn), Number((va >> 21n) & 0x1FFn), Number((va >> 30n) & 0x1FFn)];
        let offsetMax = mode === 'SV32' ? 0x3FFFFFn : 0x3FFFFFFFn;
        let offset = Number(va & BigInt(offsetMax));

        const newPath = [currentPpn];
        let targetEntry = null;
        let resData = null;

        for (let i = levels - 1; i >= 0; i--) {
          const currentTable = tables[currentPpn];

          if (!currentTable) {
            resData = { status: 'missing_table', reason: `Target Table at PPN 0x${currentPpn.toString(16).toUpperCase()} is missing`, missingPpn: currentPpn, level: i };
            break;
          }

          const currentVpn = vpns[i];
          const pte = currentTable.find(entry => entry.index === currentVpn);
          targetEntry = pte;

          if (!pte || pte.v === 0) {
            resData = { status: 'fault', reason: 'Page Fault: PTE Valid bit is 0' };
            break;
          }

          if (isLeaf(pte)) {
            let pa;
            let finalOffset;
            if (mode === 'SV32' && i === 1) {
                finalOffset = Number(va & 0x3FFFFFn);
                pa = (BigInt(pte.ppn) << 12n) | BigInt(finalOffset);
            } else if (mode === 'SV39' && i === 2) {
                finalOffset = Number(va & 0x3FFFFFFFn);
                pa = (BigInt(pte.ppn) << 12n) | BigInt(finalOffset);
            } else if (mode === 'SV39' && i === 1) {
                finalOffset = Number(va & 0x1FFFFFn);
                pa = (BigInt(pte.ppn) << 12n) | BigInt(finalOffset);
            } else {
                finalOffset = Number(va & 0xFFFn);
                pa = (BigInt(pte.ppn) << 12n) | BigInt(finalOffset);
            }
            
            resData = { 
                status: 'success', 
                va: vaHex,
                pa: '0x' + pa.toString(16).toUpperCase(), 
                ppn: pte.ppn,
                offset: '0x' + finalOffset.toString(16).toUpperCase(),
                desc: pte.desc, 
                leafLevel: i 
            };
            break;
          } else {
            if (i === 0) {
              resData = { status: 'fault', reason: 'Page Fault: Invalid Leaf PTE permissions (R=W=X=0)' };
              break;
            }
            currentPpn = pte.ppn;
            newPath.push(currentPpn);
          }
        }

        if (!resData) resData = { status: 'fault', reason: 'Page Fault: Max levels reached without finding Leaf PTE' };

        setExplorerPath(newPath);
        setCurrentStep(newPath.length - 1);
        setSelectedEntry(targetEntry);
        setTranslationResult(resData);
        
        if (resData.status === 'success') {
            setScaleIndex(getOptimalScaleIndexForLeaf(mode, resData.leafLevel));
        } else {
            setScaleIndex(SCALES[mode].length - 1);
        }

        setTimeout(() => {
            if (targetEntry) {
                const el = document.getElementById(`row-${targetEntry.index}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 50);

      }, [vaInput, memoryDB, mode]);

      const allocateTable = (ppn) => {
        const newDB = { ...memoryDB };
        const numEntries = mode === 'SV32' ? 1024 : 512;
        newDB[mode].tables[ppn] = Array.from({ length: numEntries }, (_, i) => ({
          index: i, v: 0, r: 0, w: 0, x: 0, u: 0, g: 0, a: 0, d: 0, rsw: 0, pbmt: 0, n: 0, ppn: 0, desc: 'Unallocated'
        }));
        setMemoryDB(newDB); 
      };

      const handleRelocateTable = () => {
          if (!relocatingTable) return;
          const { oldPpn, currentStep, newPaInput } = relocatingTable;
          
          let newPa;
          try {
              newPa = BigInt(newPaInput.startsWith('0x') ? newPaInput : '0x' + newPaInput);
          } catch (e) {
              alert("Invalid physical address format.");
              return;
          }

          if (newPa % 4096n !== 0n) {
              alert("Table address must be 4KB aligned.");
              return;
          }

          const newPpn = Number(newPa >> 12n);
          if (newPpn === oldPpn) {
              setRelocatingTable(null);
              return;
          }

          setMemoryDB(prev => {
              const currentModeData = prev[mode];
              const newTables = { ...currentModeData.tables };
              
              const tableData = newTables[oldPpn];
              if (tableData) {
                  newTables[newPpn] = tableData;
                  delete newTables[oldPpn];
              }

              let newSatpPpn = currentModeData.SATP_PPN;

              if (currentStep === 0) {
                  newSatpPpn = newPpn;
              } else {
                  const parentPpn = explorerPath[currentStep - 1];
                  const parentTable = newTables[parentPpn];
                  if (parentTable) {
                      newTables[parentPpn] = parentTable.map(entry => {
                          if (isPointer(entry, currentStep - 1) && entry.ppn === oldPpn) {
                              return { ...entry, ppn: newPpn };
                          }
                          return entry;
                      });
                  }
              }

              return {
                  ...prev,
                  [mode]: {
                      ...prev[mode],
                      SATP_PPN: newSatpPpn,
                      tables: newTables
                  }
              };
          });

          setExplorerPath(prev => {
              const newPath = [...prev];
              newPath[currentStep] = newPpn;
              return newPath;
          });

          setRelocatingTable(null);
      };

      const savePte = (newEntry) => {
        let newDB = { ...memoryDB };
        const table = [...(newDB[mode].tables[editingPte.tablePpn] || [])];
        const entryIndex = table.findIndex(e => e.index === newEntry.index);
        if (entryIndex !== -1) table[entryIndex] = newEntry;
        newDB[mode].tables[editingPte.tablePpn] = table;
        
        newDB = cleanupOrphanedTables(newDB, mode);

        setMemoryDB(newDB);
        setEditingPte(null);
        
        if (selectedEntry && selectedEntry.index === newEntry.index) {
            setSelectedEntry(newEntry);
            setTranslationResult(null); 
        }
      };

      const handleBulkSave = (config) => {
        const { startIndexNum, countNum, flags, startPaBigInt, updatePa } = config;
        const { tablePpn, step } = bulkEditTableInfo;
        let newDB = { ...memoryDB };
        const table = [...(newDB[mode].tables[tablePpn] || [])];
        
        const stepSize = getEntrySize(mode, step);
        const maxIdx = mode === 'SV32' ? 1023 : 511;

        for (let i = 0; i < countNum; i++) {
            const idx = startIndexNum + i;
            if (idx > maxIdx) break;

            const existingEntryIndex = table.findIndex(e => e.index === idx);
            let oldPpn = 0;
            if (existingEntryIndex !== -1) {
                oldPpn = table[existingEntryIndex].ppn || 0;
            }

            let newPpn = oldPpn;
            if (updatePa) {
                const currentPa = startPaBigInt + (BigInt(i) * stepSize);
                newPpn = Number(currentPa >> 12n);
            }

            const isPointerDesc = (flags.r === 0 && flags.w === 0 && flags.x === 0);
            
            const newEntry = {
                index: idx,
                v: flags.v, r: flags.r, w: flags.w, x: flags.x,
                u: flags.u, g: flags.g, a: flags.a, d: flags.d,
                rsw: 0, pbmt: 0, n: 0,
                ppn: newPpn,
                desc: isPointerDesc ? `Next-level table` : (flags.v ? `Mapped via Table Edit` : `Unallocated`)
            };

            if (existingEntryIndex !== -1) {
                table[existingEntryIndex] = newEntry;
            } else {
                table.push(newEntry);
            }
        }
        
        table.sort((a, b) => a.index - b.index);
        newDB[mode].tables[tablePpn] = table;
        
        newDB = cleanupOrphanedTables(newDB, mode);

        setMemoryDB(newDB);
        setBulkEditTableInfo(null);

        if (selectedEntry && selectedEntry.index >= startIndexNum && selectedEntry.index < startIndexNum + countNum) {
            setTranslationResult(null);
            setSelectedEntry(table.find(e => e.index === selectedEntry.index));
        }
      };

      const handleTableClick = (targetPpnStr, entryToSelect = null) => {
        const targetPpn = BigInt(targetPpnStr);
        const queue = [ { ppn: memoryDB[mode].SATP_PPN, path: [memoryDB[mode].SATP_PPN] } ];
        const visited = new Set();
        let foundPath = null;
        
        while(queue.length > 0) {
            const {ppn, path} = queue.shift();
            if (BigInt(ppn) === targetPpn) {
                foundPath = path;
                break;
            }
            if (!visited.has(ppn)) {
                visited.add(ppn);
                const table = memoryDB[mode].tables[ppn];
                if (table) {
                    table.forEach(entry => {
                        if (entry.v === 1 && entry.r === 0 && entry.w === 0 && entry.x === 0 && (path.length - 1) < maxStep) {
                            queue.push({ppn: entry.ppn, path: [...path, entry.ppn]});
                        }
                    });
                }
            }
        }

        if (foundPath) {
            setExplorerPath(foundPath);
            setCurrentStep(foundPath.length - 1);
            setSelectedEntry(entryToSelect);
            setTranslationResult(null);
            
            if (entryToSelect) {
                setTimeout(() => {
                    const el = document.getElementById(`row-${entryToSelect.index}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 50);
            }
        }
      };

      const getPpnSegments = (ppn) => {
        const p = BigInt(ppn);
        if (mode === 'SV32') {
          return { ppn1: (p >> 10n) & 0xFFFn, ppn0: p & 0x3FFn };
        } else {
          return { ppn2: (p >> 18n) & 0x3FFFFFFn, ppn1: (p >> 9n) & 0x1FFn, ppn0: p & 0x1FFn };
        }
      };

      const renderPhysicalMemoryVisualizer = () => {
        const currentScaleObj = SCALES[mode][safeScaleIndex];
        const currentScaleBytes = currentScaleObj.value;
        const maxPa = mode === 'SV32' ? 16n * GB : 2048n * GB;
        
        const maxScrollPa = maxPa > currentScaleBytes ? maxPa - currentScaleBytes : 0n;
        maxScrollPaRef.current = maxScrollPa;
        const viewportStart = maxScrollPa > 0n 
            ? BigInt(Math.floor(scrollRatio * Number(maxScrollPa))) 
            : 0n;
        const viewportEnd = viewportStart + currentScaleBytes;

        const paToPercent = (pa, size) => {
            const paEnd = pa + size;
            if (paEnd <= viewportStart || pa >= viewportEnd) return { hidden: true };
            
            const visibleStart = pa < viewportStart ? viewportStart : pa;
            const visibleEnd = paEnd > viewportEnd ? viewportEnd : paEnd;
            
            const topPercent = Number((visibleStart - viewportStart) * 1000000n / currentScaleBytes) / 10000;
            const heightPercent = Number((visibleEnd - visibleStart) * 1000000n / currentScaleBytes) / 10000;
            
            return { top: `${topPercent}%`, height: `${heightPercent}%`, heightValue: heightPercent, hidden: false };
        };

        let labelStep;
        let gridStep;
        
        if (mode === 'SV32') {
            if (safeScaleIndex === 0) { labelStep = 1n * GB; gridStep = 1n * GB; }       
            else if (safeScaleIndex === 1) { labelStep = 16n * MB; gridStep = 4n * MB; } 
            else { labelStep = 16n * KB; gridStep = 4n * KB; }                           
        } else {
            if (safeScaleIndex === 0) { labelStep = 32n * GB; gridStep = 32n * GB; }     
            else if (safeScaleIndex === 1) { labelStep = 1n * GB; gridStep = 1n * GB; }  
            else if (safeScaleIndex === 2) { labelStep = 16n * MB; gridStep = 2n * MB; } 
            else { labelStep = 16n * KB; gridStep = 4n * KB; }                           
        }

        const labels = [];
        const grids = [];
        
        if (gridStep > 0n) {
            const firstBoundary = viewportStart - (viewportStart % gridStep);
            for (let pa = firstBoundary; pa <= viewportEnd; pa += gridStep) {
                const topPercent = Number((pa - viewportStart) * 1000000n / currentScaleBytes) / 10000;
                
                if (topPercent >= 0 && topPercent <= 100) {
                    const isMajor = pa % labelStep === 0n;
                    grids.push({ top: `${topPercent}%`, isMajor });
                    
                    if (isMajor) {
                        let unitStr = "";
                        if (pa === 0n) {
                            if (labelStep % GB === 0n) unitStr = `(0GB)`;
                            else if (labelStep % MB === 0n) unitStr = `(0MB)`;
                            else unitStr = `(0KB)`;
                        } else {
                            if (pa % GB === 0n) unitStr = `(${Number(pa / GB)}GB)`;
                            else if (pa % MB === 0n) unitStr = `(${Number(pa / MB)}MB)`;
                            else if (pa % KB === 0n) unitStr = `(${Number(pa / KB)}KB)`;
                        }
                        labels.push({ pa, topPercent, text: `0x${pa.toString(16).toUpperCase()}`, unit: unitStr });
                    }
                }
            }
        }

        const tableLevels = {};
        const queue = [{ppn: memoryDB[mode].SATP_PPN, level: 1}];
        while(queue.length > 0) {
            const {ppn, level} = queue.shift();
            if (!tableLevels[ppn]) {
                tableLevels[ppn] = level;
                const table = memoryDB[mode].tables[ppn];
                if (table) {
                    table.forEach(entry => {
                        if (entry.v === 1 && entry.r === 0 && entry.w === 0 && entry.x === 0 && (level - 1) < maxStep) {
                            queue.push({ppn: entry.ppn, level: level + 1});
                        }
                    });
                }
            }
        }

        const regions = [];

        Object.entries(memoryDB[mode].tables).forEach(([ppnStr, table]) => {
            const ppn = BigInt(ppnStr);
            const pa = ppn * 4096n;
            const size = 4096n;
            const paEnd = pa + size;
            const level = tableLevels[ppnStr];
            
            if (level && paEnd > viewportStart && pa < viewportEnd) {
                regions.push({ type: 'table', level, pa, size, ppn: ppnStr });
            }
        });

        const currentPpn = explorerPath[currentStep];
        
        if (showAllMappings) {
            Object.entries(tableLevels).forEach(([ppnStr, level]) => {
                const table = memoryDB[mode].tables[ppnStr];
                if (!table) return;
                const stepIndex = level - 1;
                table.forEach(entry => {
                    if (entry.v === 1 && entry.ppn != null && isLeaf(entry)) {
                        let size = getEntrySize(mode, stepIndex);
                        let pa = BigInt(entry.ppn) * 4096n;
                        if (pa + size > viewportStart && pa < viewportEnd) {
                            let isSelected = selectedEntry?.index === entry.index && currentPpn?.toString() === ppnStr;
                            regions.push({ type: 'target', pa, size, ppn: entry.ppn, isSelected, entry, tablePpn: ppnStr });
                        }
                    }
                });
            });
        } else {
            if (selectedEntry && selectedEntry.v === 1 && selectedEntry.ppn != null && isLeaf(selectedEntry)) {
                let size = getEntrySize(mode, currentStep);
                let pa = BigInt(selectedEntry.ppn) * 4096n;
                if (pa + size > viewportStart && pa < viewportEnd) {
                    regions.push({ type: 'target', pa, size, ppn: selectedEntry.ppn, isSelected: true, entry: selectedEntry, tablePpn: currentPpn });
                }
            }
        }

        const filteredRegions = regions.filter((reg) => {
           if (mode === 'SV32') {
               if (safeScaleIndex === 0) { 
                   return reg.type === 'target' && reg.size >= 4n * MB;
               } else if (safeScaleIndex === 1) { 
                   return reg.type === 'target' && reg.size >= 4n * MB;
               } else { 
                   return true; 
               }
           } else { 
               if (safeScaleIndex === 0) { 
                   return reg.type === 'target' && reg.size >= 1n * GB;
               } else if (safeScaleIndex === 1) { 
                   return reg.type === 'target' && reg.size >= 2n * MB;
               } else if (safeScaleIndex === 2) { 
                   return reg.type === 'target' && reg.size >= 2n * MB;
               } else { 
                   return true;
               }
           }
        });

        const isClickable = safeScaleIndex !== 0;

        const clickHintTarget = isClickable ? '\nClick to select this entry in the table' : '\n(Not clickable in Macro View)';
        const clickHintTable = isClickable ? '\nClick to navigate to this table' : '';

        return (
            <div className="w-[600px] flex-shrink-0 bg-white rounded-[1rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[1200px] border border-stone-200 overflow-hidden">
               <div className="px-4 py-3 bg-stone-100 border-b border-stone-200 text-xs flex flex-col gap-3 shadow-inner z-10">
                  <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-600 uppercase tracking-widest text-[10px]">Physical Memory View</span>
                      <div className="flex items-center bg-white border border-stone-300 rounded shadow-[0_2px_4px_rgb(0,0,0,0.02)] overflow-hidden text-xs">
                          <button 
                              onClick={() => setScaleIndex(Math.max(0, safeScaleIndex - 1))}
                              disabled={safeScaleIndex === 0}
                              className="px-3 py-1 bg-stone-50 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-stone-600 border-r border-stone-300 transition-colors"
                              title="Zoom Out (Broader View)"
                          >
                              <ZoomOutIcon />
                          </button>
                          
                          <div className="px-2 py-0.5 font-bold text-stone-800 min-w-[150px] text-center select-none flex flex-col leading-tight">
                              <span>{currentScaleObj.label.split(' ')[0]}</span>
                              <span className="text-[9px] text-stone-500 font-normal">{currentScaleObj.label.split(' ').slice(1).join(' ')}</span>
                          </div>
                          
                          <button 
                              onClick={() => setScaleIndex(Math.min(SCALES[mode].length - 1, safeScaleIndex + 1))}
                              disabled={safeScaleIndex === SCALES[mode].length - 1}
                              className="px-3 py-1 bg-stone-50 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-stone-600 border-l border-stone-300 transition-colors"
                              title="Zoom In (Detailed View)"
                          >
                              <ZoomInIcon />
                          </button>
                      </div>
                  </div>
               </div>

                <div className={`px-4 py-3 bg-stone-50 border-b border-stone-200 text-[10px] text-stone-600 font-mono grid ${mode === 'SV39' ? 'grid-cols-3' : 'grid-cols-2'} gap-y-2 select-none z-10 shadow-sm`}>
                    {/* Row 1: Tables */}
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-purple-500 shadow-[0_2px_4px_rgb(0,0,0,0.02)]"></span> {mode === 'SV39' ? 'Level 2' : 'Level 1'} Table</div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-indigo-500 shadow-[0_2px_4px_rgb(0,0,0,0.02)]"></span> {mode === 'SV39' ? 'Level 1' : 'Level 0'} Table</div>
                    {mode === 'SV39' && <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-cyan-500 shadow-[0_2px_4px_rgb(0,0,0,0.02)]"></span> Level 0 Table</div>}

                    {/* Row 2: Pages */}
                    {mode === 'SV39' && <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-rose-400 shadow-[0_0_4px_rgba(251,113,133,0.6)]"></span> 1GB Page</div>}
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]"></span> {mode === 'SV39' ? '2MB Page' : '4MB Page'}</div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.6)]"></span> 4KB Page</div>
                </div>

               <div 
                   ref={mapRef}
                   className={`flex-1 flex px-4 py-6 relative bg-stone-200 ${maxScrollPa > 0n ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
                   onScroll={(e) => {
                       const { scrollTop, scrollHeight, clientHeight } = e.target;
                       const ratio = scrollTop / (scrollHeight - clientHeight);
                       setScrollRatio(ratio);
                   }}
               >
                   {/* Conditional phantom height: only enable scrolling when scale < maxPa */}
                   <div style={{ height: maxScrollPa > 0n ? '2000000px' : '100%', width: '1px', position: 'absolute', pointerEvents: 'none' }}></div>
                   
                   <div className="w-[220px] flex-shrink-0 sticky top-0 h-full border-r-2 border-stone-400 text-[10px] font-mono text-stone-600 font-bold select-none">
                       {labels.map((lb) => (
                           <div 
                               key={`label-${lb.pa}`} 
                               className="absolute right-3 text-right whitespace-nowrap transform -translate-y-1/2"
                               style={{ top: `${lb.topPercent}%` }}
                           >
                               <span className="text-stone-800 text-[11px] tracking-wide">{lb.text}</span>
                               <span className="text-[10px] text-stone-900 ml-1.5">{lb.unit}</span>
                           </div>
                       ))}
                   </div>

                   <div className="flex-1 bg-white border border-stone-300 sticky top-0 h-full shadow-inner mx-3 transition-all duration-500 ease-out overflow-hidden">
                       
                       {grids.map((grid, idx) => (
                           <div 
                               key={`grid-${idx}`} 
                               className={`absolute w-full border-t z-50 pointer-events-none ${grid.isMajor ? 'border-stone-800/80' : 'border-stone-600/60'}`} 
                               style={{ top: grid.top }}
                           />
                       ))}

                       {filteredRegions.map((reg, idx) => {
                           const pos = paToPercent(reg.pa, reg.size);
                           if (pos.hidden) return null;
                           
                           if (reg.type === 'target') {
                               const zIndex = reg.isSelected ? 'z-30' : 'z-20';
                               
                               let baseColor = 'bg-amber-500';
                               let pulseClass = reg.isSelected ? 'shadow-[inset_0_0_16px_rgba(255,255,255,0.6)] ring-2 ring-inset ring-amber-200' : '';
                               let borderColor = 'border-amber-500';
                               let hoverClass = isClickable ? 'cursor-pointer hover:brightness-110 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]' : 'pointer-events-none opacity-90';
                               
                               if (reg.size === 4n * MB || reg.size === 2n * MB) {
                                   baseColor = 'bg-emerald-400';
                                   pulseClass = reg.isSelected ? 'shadow-[inset_0_0_16px_rgba(255,255,255,0.6)] ring-2 ring-inset ring-emerald-200' : '';
                                   borderColor = 'border-emerald-500';
                                   hoverClass = isClickable ? 'cursor-pointer hover:brightness-110 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]' : 'pointer-events-none opacity-90';
                               } else if (reg.size === 1n * GB) {
                                   baseColor = 'bg-rose-400';
                                   pulseClass = reg.isSelected ? 'shadow-[inset_0_0_16px_rgba(255,255,255,0.6)] ring-2 ring-inset ring-rose-200' : '';
                                   borderColor = 'border-rose-500';
                                   hoverClass = isClickable ? 'cursor-pointer hover:brightness-110 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]' : 'pointer-events-none opacity-90';
                               }
                               
                               const isVerySmall = pos.heightValue < 0.4;
                               const targetBorderClass = isVerySmall ? '' : `border-y ${borderColor}`;
                               
                               return (
                                   <div
                                       key={`target-${idx}-${reg.ppn}`}
                                       className={`absolute w-full box-border ${baseColor} ${zIndex} opacity-100 ${pulseClass} ${targetBorderClass} transition-all duration-300 ${hoverClass}`}
                                       style={{ top: pos.top, height: `calc(${pos.height} + 1px)`, minHeight: reg.isSelected ? '4px' : '2px' }}
                                       title={`[Target Memory]\nPA: 0x${reg.pa.toString(16).toUpperCase()}\nSize: ${reg.size.toString()} Bytes${clickHintTarget}`}
                                       onClick={(e) => { 
                                           if (isClickable) { e.stopPropagation(); handleTableClick(reg.tablePpn, reg.entry); } 
                                       }}
                                   />
                               );
                           } else {
                               let bgColor = 'bg-purple-500';
                               let titleExtra = mode === 'SV39' ? 'Level 2 table' : 'Level 1 table';
                               if (reg.level === 2) { 
                                   bgColor = 'bg-indigo-500'; 
                                   titleExtra = mode === 'SV39' ? 'Level 1 Table' : 'Level 0 Table'; 
                               }
                               else if (reg.level === 3) { 
                                   bgColor = 'bg-cyan-500'; 
                                   titleExtra = 'Level 0 Table'; 
                               }

                               const isVerySmall = pos.heightValue < 0.4;
                               const tableBorderClass = isVerySmall ? '' : 'border-y border-white/30';
                               const tableHoverClass = isClickable 
                                   ? 'cursor-pointer hover:brightness-110 hover:shadow-[inset_0_0_16px_rgba(255,255,255,0.4)]' 
                                   : 'pointer-events-none opacity-90';

                               return (
                                   <div
                                       key={`table-${reg.ppn}`}
                                       className={`absolute w-full box-border ${bgColor} z-40 transition-all duration-300 ${tableBorderClass} ${tableHoverClass}`}
                                       style={{ top: pos.top, height: `calc(${pos.height} + 1px)`, minHeight: '2px' }}
                                       title={`[Page Table: ${titleExtra}]\nPPN: 0x${Number(reg.ppn).toString(16).toUpperCase()}\nSize: 4KB${clickHintTable}`}
                                       onClick={(e) => { 
                                           if (isClickable) { e.stopPropagation(); handleTableClick(reg.ppn); } 
                                       }}
                                   />
                                );
                            }
                        })}
                    </div>
                </div>
             </div>
        );
      };

      const renderCurrentTable = () => {
        if (explorerPath.length === 0) return null;
        const currentPpn = explorerPath[currentStep];
        if (currentPpn == null) return null;

        const tableData = memoryDB[mode].tables[currentPpn];
        const levelNum = mode === 'SV39' ? 2 - currentStep : 1 - currentStep;
        const levelDisplay = `Level ${levelNum} Table`;

        if (!tableData) {
            return (
                <div className="w-[880px] flex-shrink-0 bg-white rounded-[1rem] shadow-[0_8px_24px_rgb(0,0,0,0.03)] border border-stone-200 overflow-hidden flex flex-col h-[1200px]">
                    <div className="bg-white text-stone-900 border-b border-stone-200 p-3 flex items-center justify-between font-bold text-base flex-shrink-0">
                        <span className="whitespace-nowrap ml-1">
                            {levelDisplay}
                        </span>
                        <div className="flex gap-3 items-center">
                            <button 
                                onClick={() => setRelocatingTable({ oldPpn: currentPpn, currentStep, newPaInput: (BigInt(currentPpn) << 12n).toString(16).toUpperCase() })}
                                className="bg-indigo-50 px-2.5 py-1 rounded-md text-[11px] text-indigo-700 font-mono border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 shadow-sm group"
                                title="Click to relocate this Table to a different physical address"
                            >
                                <EditIcon className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                                Table Physical Address: 0x{(BigInt(currentPpn) << 12n).toString(16).toUpperCase()}
                            </button>
                        </div>
                    </div>
                    <div className="flex-grow flex items-center justify-center p-8 bg-stone-50">
                        <div className="max-w-md w-full bg-indigo-50 rounded-2xl border border-indigo-100 p-8 text-center shadow-sm animate-in zoom-in-95 duration-300">
                            <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 border border-indigo-100">
                                <Database className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h3 className="font-bold text-indigo-900 text-xl mb-2">Unallocated Page Table Found</h3>
                            <p className="text-sm text-indigo-700/80 mb-8 leading-relaxed">
                                The pointer references <code className="bg-indigo-100 px-1.5 py-0.5 rounded font-bold">PPN 0x{currentPpn.toString(16).toUpperCase()}</code><br/>
                                but no table data has been initialized at this address.
                            </p>
                            <button 
                                onClick={() => allocateTable(currentPpn)} 
                                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold text-base hover:bg-indigo-700 shadow-[0_4px_12px_rgba(79,70,229,0.3)] transition-all active:scale-[0.98]"
                            >
                                <PlusCircle className="w-5 h-5" /> Allocate New Table
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
          <div className="w-[880px] flex-shrink-0 bg-white rounded-[1rem] shadow-[0_8px_24px_rgb(0,0,0,0.03)] border border-stone-200 overflow-hidden flex flex-col h-[1200px]">
            <div className="bg-white text-stone-900 border-b border-stone-200 p-3 flex items-center justify-between flex-shrink-0">
              <span className="font-bold text-lg text-stone-800 whitespace-nowrap ml-1">
                {levelDisplay}
              </span>
              <div className="flex gap-3 items-center">
                <button 
                  onClick={() => setBulkEditTableInfo({ tablePpn: currentPpn, step: currentStep })}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-xs font-bold transition-all shadow-sm active:scale-95"
                  title="Batch configure multiple entries in this Table"
                >
                  <SettingsIcon className="w-3.5 h-3.5" /> Edit Page Table
                </button>
                <button 
                  onClick={() => setRelocatingTable({ oldPpn: currentPpn, currentStep, newPaInput: (BigInt(currentPpn) << 12n).toString(16).toUpperCase() })}
                  className="bg-indigo-50 px-2.5 py-1 rounded-md text-[11px] text-indigo-700 font-mono border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 shadow-sm group"
                  title="Click to relocate this Table to a different physical address"
                >
                  <EditIcon className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                  Table Physical Address: 0x{(BigInt(currentPpn) << 12n).toString(16).toUpperCase()}
                </button>
              </div>
            </div>
            
            <div className="p-2 overflow-y-auto flex-grow scroll-smooth relative bg-stone-50">
              {tableData.map((entry, idx) => {
                const isSelected = selectedEntry?.index === entry.index;
                const isFault = isInvalid(entry, currentStep);
                const pointer = isPointer(entry, currentStep);
                const segs = getPpnSegments(entry.ppn);

                const ptePPN = BigInt(entry.ppn || 0);
                const pteRSW = BigInt(entry.rsw || 0);
                const flags = BigInt(
                    ((entry.d || 0) << 7) |
                    ((entry.a || 0) << 6) |
                    ((entry.g || 0) << 5) |
                    ((entry.u || 0) << 4) |
                    ((entry.x || 0) << 3) |
                    ((entry.w || 0) << 2) |
                    ((entry.r || 0) << 1) |
                    (entry.v || 0)
                );

                let fullPte;
                if (mode === 'SV32') {
                    fullPte = (ptePPN << 10n) | (pteRSW << 8n) | flags;
                } else {
                    const pteN = BigInt(entry.n || 0);
                    const ptePBMT = BigInt(entry.pbmt || 0);
                    fullPte = (pteN << 63n) | (ptePBMT << 61n) | (ptePPN << 10n) | (pteRSW << 8n) | flags;
                }
                
                const pteBits = mode === 'SV32' ? 32 : 64;
                let formattedPte = '';
                if (pteFormat === 'HEX') formattedPte = `${pteBits}'h${fullPte.toString(16).padStart(pteBits/4, '0').toUpperCase()}`;
                else if (pteFormat === 'DEC') formattedPte = `${pteBits}'d${fullPte.toString(10)}`;
                else if (pteFormat === 'BIN') formattedPte = `${pteBits}'b${fullPte.toString(2).padStart(pteBits, '0')}`;
                
                return (
                  <div
                    key={idx}
                    id={`row-${entry.index}`}
                    onClick={(e) => {
                        if (!e.target.closest('.edit-btn') && !e.target.closest('.format-btn')) handleRowClick(entry);
                    }}
                    className={`w-full mb-1.5 p-1.5 rounded-lg border transition-all duration-200 cursor-pointer group flex items-stretch gap-2
                      ${isSelected 
                        ? 'bg-stone-100 border-blue-500 ring-2 ring-stone-200 shadow-[0_4px_12px_rgb(0,0,0,0.02)]' 
                        : 'bg-white border-stone-200 hover:bg-stone-100 hover:border-stone-400 shadow-[0_2px_4px_rgb(0,0,0,0.02)]'
                      }
                      ${isFault && !isSelected ? 'opacity-60 grayscale' : ''}
                    `}
                  >
                    <div 
                      className="format-btn flex flex-col items-center justify-center bg-stone-200 hover:bg-stone-300 rounded px-2 min-w-[75px] max-w-[75px] flex-shrink-0 font-mono cursor-pointer transition-colors shadow-[0_2px_4px_rgb(0,0,0,0.02)]"
                      onClick={(e) => {
                          e.stopPropagation();
                          setIndexFormat(prev => prev === 'DEC' ? 'HEX' : prev === 'HEX' ? 'BIN' : 'DEC');
                      }}
                      title="Click to cycle radix (Dec / Hex / Bin)"
                    >
                      <span className="text-[9px] text-stone-500 uppercase font-bold leading-none mb-1">Idx</span>
                      <div className={`font-bold text-stone-800 text-center overflow-hidden text-ellipsis w-full tracking-tight ${indexFormat === 'BIN' ? 'text-[8.5px]' : 'text-xs'}`}>
                        {(() => {
                            const idxBits = mode === 'SV32' ? 10 : 9;
                            if (indexFormat === 'DEC') return `${idxBits}'d${entry.index.toString(10)}`;
                            if (indexFormat === 'HEX') return `${idxBits}'h${entry.index.toString(16).toUpperCase()}`;
                            if (indexFormat === 'BIN') return `${idxBits}'b${entry.index.toString(2).padStart(idxBits, '0')}`;
                        })()}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-1 text-[10px] font-mono overflow-hidden min-w-0">
                      <div className="flex border border-stone-300 rounded overflow-hidden text-center divide-x divide-stone-300 h-5">
                        {mode === 'SV39' && <div className="px-1.5 bg-stone-200 flex items-center justify-center text-stone-600 font-bold">N:{entry.n}</div>}
                        {mode === 'SV39' && <div className="px-1.5 bg-stone-200 flex items-center justify-center text-stone-600 font-bold">PBMT:{entry.pbmt}</div>}
                        
                        <div 
                          className="flex-1 flex divide-x divide-stone-300 cursor-pointer hover:opacity-75 transition-opacity min-w-0"
                          onClick={(e) => {
                              e.stopPropagation();
                              if (window.getSelection().toString().length > 0) return;
                              const formats = ['SEP_HEX', 'SEP_DEC', 'SEP_BIN', 'COMB_HEX', 'COMB_DEC', 'COMB_BIN'];
                              setPpnFormat(prev => formats[(formats.indexOf(prev) + 1) % formats.length]);
                          }}
                          title={`Current Format: ${
                              ppnFormat === 'SEP_HEX' ? 'Segmented (Hex)' :
                              ppnFormat === 'SEP_DEC' ? 'Segmented (Dec)' :
                              ppnFormat === 'SEP_BIN' ? 'Segmented (Bin)' :
                              ppnFormat === 'COMB_HEX' ? 'Combined (Hex)' :
                              ppnFormat === 'COMB_DEC' ? 'Combined (Dec)' : 'Combined (Bin)'
                          }\n?? Click to cycle display format`}
                        >
                          {(() => {
                              const ppnVal = BigInt(entry.ppn || 0);
                              const isActive = entry.v === 1;
                              
                              const getStr = (val, bits) => {
                                  if (ppnFormat.endsWith('HEX')) return `${bits}'h${val.toString(16).toUpperCase()}`;
                                  if (ppnFormat.endsWith('DEC')) return `${bits}'d${val.toString(10)}`;
                                  if (ppnFormat.endsWith('BIN')) return `${bits}'b${val.toString(2).padStart(bits, '0')}`;
                              };
                              
                              const binClass = ppnFormat.endsWith('BIN') ? 'text-[8px] tracking-tighter' : '';
                              
                              if (ppnFormat.startsWith('COMB_')) {
                                  const totalBits = mode === 'SV32' ? 22 : 44;
                                  const fullText = `PPN:${getStr(ppnVal, totalBits)}`;
                                  return (
                                      <div className={`flex-1 flex items-center justify-center font-bold px-1 overflow-hidden whitespace-nowrap text-ellipsis min-w-0 ${binClass} ${isActive ? 'bg-stone-100 text-blue-800' : 'bg-stone-100 text-stone-400'}`} title={fullText}>
                                          {fullText}
                                      </div>
                                  );
                              } else {
                                  return (
                                      <Fragment>
                                          {mode === 'SV39' && (
                                              <div className={`${ppnFormat.endsWith('BIN') ? 'flex-[2.5]' : 'flex-[1.4]'} flex items-center justify-center font-bold px-0.5 overflow-hidden whitespace-nowrap text-ellipsis min-w-0 ${binClass} ${isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-stone-100 text-stone-400'}`} title={`PPN[2]: ${getStr(segs.ppn2 || 0n, 26)}`}>
                                                  PPN[2]:{getStr(segs.ppn2 || 0n, 26)}
                                              </div>
                                          )}
                                          <div className={`flex-1 flex items-center justify-center font-bold px-0.5 overflow-hidden whitespace-nowrap text-ellipsis min-w-0 ${binClass} ${isActive ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-400'}`} title={`PPN[1]: ${getStr(segs.ppn1 || 0n, mode === 'SV32' ? 12 : 9)}`}>
                                              PPN[1]:{getStr(segs.ppn1 || 0n, mode === 'SV32' ? 12 : 9)}
                                          </div>
                                          <div className={`flex-1 flex items-center justify-center font-bold px-0.5 overflow-hidden whitespace-nowrap text-ellipsis min-w-0 ${binClass} ${isActive ? 'bg-sky-100 text-sky-800' : 'bg-stone-100 text-stone-400'}`} title={`PPN[0]: ${getStr(segs.ppn0 || 0n, mode === 'SV32' ? 10 : 9)}`}>
                                              PPN[0]:{getStr(segs.ppn0 || 0n, mode === 'SV32' ? 10 : 9)}
                                          </div>
                                      </Fragment>
                                  );
                              }
                          })()}
                        </div>
                      </div>

                      <div className="flex border border-stone-300 rounded overflow-hidden text-center divide-x divide-stone-300 h-5">
                        <div className="px-2 bg-stone-200 flex items-center justify-center text-stone-600 font-bold min-w-0">RSW:{entry.rsw}</div>
                        <div className="flex-1 flex divide-x divide-stone-200 bg-white min-w-0">
                          <div className={`flex-1 flex items-center justify-center ${entry.d ? 'bg-red-100 text-red-700 font-bold' : 'text-stone-300'}`}>D:{entry.d}</div>
                          <div className={`flex-1 flex items-center justify-center ${entry.a ? 'bg-amber-100 text-amber-700 font-bold' : 'text-stone-300'}`}>A:{entry.a}</div>
                          <div className={`flex-1 flex items-center justify-center ${entry.g ? 'bg-teal-100 text-teal-700 font-bold' : 'text-stone-300'}`}>G:{entry.g}</div>
                          <div className={`flex-1 flex items-center justify-center ${entry.u ? 'bg-stone-100 text-stone-800 font-bold' : 'text-stone-300'}`}>U:{entry.u}</div>
                          <div className={`flex-1 flex items-center justify-center ${entry.x ? 'bg-purple-100 text-purple-700 font-bold' : 'text-stone-300'}`}>X:{entry.x}</div>
                          <div className={`flex-1 flex items-center justify-center ${entry.w ? 'bg-purple-100 text-purple-700 font-bold' : 'text-stone-300'}`}>W:{entry.w}</div>
                          <div className={`flex-1 flex items-center justify-center ${entry.r ? 'bg-purple-100 text-purple-700 font-bold' : 'text-stone-300'}`}>R:{entry.r}</div>
                          <div className={`flex-1 flex items-center justify-center ${entry.v ? 'bg-green-100 text-green-700 font-bold' : 'bg-red-50 text-red-400 font-bold'}`}>V:{entry.v}</div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`format-btn flex flex-col items-center justify-center bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded px-1.5 flex-shrink-0 font-mono cursor-pointer transition-all duration-300 shadow-[0_2px_4px_rgb(0,0,0,0.02)] overflow-hidden ${pteFormat === 'BIN' ? 'w-[320px]' : 'w-[130px]'}`}
                      onClick={(e) => {
                          e.stopPropagation();
                          if (window.getSelection().toString().length > 0) return;
                          setPteFormat(prev => prev === 'HEX' ? 'DEC' : prev === 'DEC' ? 'BIN' : 'HEX');
                      }}
                      title={`View PTE Details (${pteFormat})\nClick to toggle representation`}
                    >
                      <span className="text-[9px] text-stone-500 uppercase font-bold leading-none mb-1">Full PTE</span>
                      <div className={`font-bold text-stone-800 w-full text-center overflow-hidden text-ellipsis whitespace-nowrap ${pteFormat === 'BIN' ? 'text-[8.5px] tracking-tight' : 'text-[10px] tracking-tight'}`} title={formattedPte}>
                        {formattedPte}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1 w-6">
                      <button 
                        className="edit-btn p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                        onClick={() => setEditingPte({ tablePpn: currentPpn, entry: { ...entry } })}
                        title="Edit this PTE"
                      >
                        <EditIcon />
                      </button>
                      {pointer && (
                         <div className="text-stone-700 animate-pulse" title="Click to enter next level">
                            <ChevronRight />
                         </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      };

      const BitBox = ({ label, bits, value, color, bitRange, subLabel }) => (
        <div className="flex flex-col items-stretch flex-1 min-w-0">
          <div className="flex justify-between text-[9px] font-mono text-stone-400 mb-0.5 px-1">
            <span>{bitRange[1]}</span>
            <span>{bitRange[0]}</span>
          </div>
          <div className={`border-x border-y border-stone-300/60 h-10 flex flex-col items-center justify-center relative`}>
            <span className="text-[10px] font-bold truncate px-1 opacity-80">{label}</span>
            {value !== undefined && (
                <span className="text-[9px] font-mono select-text cursor-text px-1 rounded mt-0.5">
                    {typeof value === 'string' ? value : `0x${value.toString(16).toUpperCase()}`}
                </span>
            )}
          </div>
          <div className="text-[9px] text-center text-stone-500 font-medium mt-1 tracking-tighter">
            {bits} Bits
            {subLabel && <div className="mt-0.5">{subLabel}</div>}
          </div>
        </div>
      );


      const renderBitFields = (title, type, valueBigInt, isLeaf = false, leafLevel = 0) => {
        const isVA = type === 'VA';
        const isSV39 = mode === 'SV39';
        
        const cycleMode = (e) => {
            if (window.getSelection().toString().length > 0) return;
            setBitDiagramMode((bitDiagramMode + 1) % 6);
        };

        const formatValue = (val, m, bits) => {
            if (val === "xxxxx") return "xxxxx";
            if (typeof val === 'string') return val;
            const bMode = m % 3;
            if (bMode === 0) return `0x${val.toString(16).toUpperCase()}`;
            if (bMode === 1) return val.toString(10);
            return `0b${val.toString(2).padStart(bits, '0')}`;
        };

        const formatFull = (val, m, bits) => {
            const bMode = m % 3;
            if (bMode === 0) return `0x${val.toString(16).toUpperCase()}`;
            if (bMode === 1) return val.toString(10);
            return `0b${val.toString(2).padStart(bits, '0')}`;
        };

        const isFullMode = bitDiagramMode >= 3;

        return (
            <div className="cursor-pointer" onClick={cycleMode}>
                <div className={`text-[11px] font-bold mb-4 flex items-center gap-2 ${isVA ? 'text-amber-800' : 'text-amber-800'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isVA ? 'bg-amber-500' : 'bg-amber-500'}`}></div>
                    {title}
                    <span className="text-[9px] font-normal opacity-50 ml-auto">Click to toggle format</span>
                </div>
                <div className="flex items-start gap-px">
                    {isFullMode ? (
                        <BitBox 
                            label={`Full ${type} Address`} 
                            bits={isVA ? (isSV39 ? 39 : 32) : (isSV39 ? 56 : 34)} 
                            value={formatFull(valueBigInt, bitDiagramMode, isVA ? (isSV39 ? 39 : 32) : (isSV39 ? 56 : 34))}
                            color={isVA ? "bg-indigo-50" : "bg-amber-100"} 
                            bitRange={[0, isVA ? (isSV39 ? 38 : 31) : (isSV39 ? 55 : 33)]} 
                        />
                    ) : (
                        <>
                            {isSV39 ? (
                                isVA ? (
                                    <>
                                        {(() => {
                                            const vpn2 = Number((valueBigInt >> 30n) & 0x1FFn);
                                            const vpn1 = Number((valueBigInt >> 21n) & 0x1FFn);
                                            const vpn0 = Number((valueBigInt >> 12n) & 0x1FFn);
                                            const off = Number(valueBigInt & 0xFFFn);
                                            return (
                                                <>
                                                    <BitBox label="VPN[2]" bits={9} value={formatValue(vpn2, bitDiagramMode, 9)} color="bg-indigo-50" bitRange={[30, 38]} subLabel={`Index: ${vpn2}`} />
                                                    <BitBox label="VPN[1]" bits={9} value={formatValue(vpn1, bitDiagramMode, 9)} color="bg-indigo-50" bitRange={[21, 29]} subLabel={`Index: ${vpn1}`} />
                                                    <BitBox label="VPN[0]" bits={9} value={formatValue(vpn0, bitDiagramMode, 9)} color="bg-indigo-50" bitRange={[12, 20]} subLabel={`Index: ${vpn0}`} />
                                                    <BitBox label="Page Offset" bits={12} value={formatValue(off, bitDiagramMode, 12)} color="bg-stone-100" bitRange={[0, 11]} />
                                                </>
                                            );
                                        })()}
                                    </>
                                ) : (
                                    <>
                                        {(() => {
                                            const ppn2 = Number((valueBigInt >> 30n) & 0x3FFFFFFn);
                                            const ppn1 = Number((valueBigInt >> 21n) & 0x1FFn);
                                            const ppn0 = Number((valueBigInt >> 12n) & 0x1FFn);
                                            const off = Number(valueBigInt & 0xFFFn);
                                            return (
                                                <>
                                                    <BitBox label="PPN[2]" bits={26} value={formatValue(ppn2, bitDiagramMode, 26)} color="bg-amber-100" bitRange={[30, 55]} />
                                                    <BitBox label="PPN[1]" bits={9} value={formatValue(ppn1, bitDiagramMode, 9)} color="bg-amber-100" bitRange={[21, 29]} />
                                                    <BitBox label="PPN[0]" bits={9} value={formatValue(ppn0, bitDiagramMode, 9)} color="bg-amber-100" bitRange={[12, 20]} />
                                                    <BitBox label="Page Offset" bits={12} value={formatValue(off, bitDiagramMode, 12)} color="bg-stone-100" bitRange={[0, 11]} />
                                                </>
                                            );
                                        })()}
                                    </>
                                )
                            ) : (
                                isVA ? (
                                    <>
                                        {(() => {
                                            const vpn1 = Number((valueBigInt >> 22n) & 0x3FFn);
                                            const vpn0 = Number((valueBigInt >> 12n) & 0x3FFn);
                                            const off = Number(valueBigInt & 0xFFFn);
                                            return (
                                                <>
                                                    <BitBox label="VPN[1]" bits={10} value={formatValue(vpn1, bitDiagramMode, 10)} color="bg-indigo-50" bitRange={[22, 31]} subLabel={`Index: ${vpn1}`} />
                                                    <BitBox label="VPN[0]" bits={10} value={formatValue(vpn0, bitDiagramMode, 10)} color="bg-indigo-50" bitRange={[12, 21]} subLabel={`Index: ${vpn0}`} />
                                                    <BitBox label="Page Offset" bits={12} value={formatValue(off, bitDiagramMode, 12)} color="bg-stone-100" bitRange={[0, 11]} />
                                                </>
                                            );
                                        })()}
                                    </>
                                ) : (
                                    <>
                                        {(() => {
                                            const ppn1 = Number((valueBigInt >> 22n) & 0xFFFn);
                                            const ppn0 = Number((valueBigInt >> 12n) & 0x3FFn);
                                            const off = Number(valueBigInt & 0xFFFn);
                                            return (
                                                <>
                                                    <BitBox label="PPN[1]" bits={12} value={formatValue(ppn1, bitDiagramMode, 12)} color="bg-amber-100" bitRange={[22, 33]} />
                                                    <BitBox label="PPN[0]" bits={10} value={formatValue(ppn0, bitDiagramMode, 10)} color="bg-amber-100" bitRange={[12, 21]} />
                                                    <BitBox label="Page Offset" bits={12} value={formatValue(off, bitDiagramMode, 12)} color="bg-stone-100" bitRange={[0, 11]} />
                                                </>
                                            );
                                        })()}
                                    </>
                                )
                            )}
                        </>
                    )}
                </div>
            </div>
        );
      };

      const renderDetailsPanel = () => {
        if (explorerPath.length === 0) return null;
        
        const currentPpn = explorerPath[currentStep];
        if (currentPpn == null) return null;

        const isMissingTable = !memoryDB[mode].tables[currentPpn];

        if (translationResult) {
            if (translationResult.status === 'success') {
                return (
                  <div className="w-full bg-amber-50 rounded-xl shadow-md border border-amber-200 animate-in slide-in-from-top-2 overflow-hidden">
                    <div className="bg-amber-500 text-white px-4 py-2 flex items-center gap-2 font-semibold text-sm">
                      <Cpu className="w-4 h-4"/> VA Translation Successful (Walkthrough)
                    </div>
                    <div className="p-6 flex flex-col gap-8">
                      {/* Virtual Address breakdown */}
                      {renderBitFields("Virtual Address Breakdown", "VA", BigInt(translationResult.va))}

                      <div className="flex justify-center -my-4 relative z-10">
                         <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold border border-amber-200 shadow-sm flex items-center gap-2">
                            <span>Maps to Physical Page Frame</span>
                            <ChevronDown className="w-3 h-3" />
                         </div>
                      </div>

                      {/* Physical Address construction */}
                      {(() => {
                         // We need the VA bits to correctly show superpage passthrough in PPN diagram
                         const va = BigInt(translationResult.va);
                         const pa = BigInt(translationResult.pa);
                         const isSV39 = mode === 'SV39';
                         const leafLevel = translationResult.leafLevel;
                         
                         // If bitDiagramMode < 3, we use a custom renderer for the superpage case
                         if (bitDiagramMode < 3) {
                            const cycleMode = (e) => {
                                if (window.getSelection().toString().length > 0) return;
                                setBitDiagramMode((bitDiagramMode + 1) % 6);
                            };
                            const formatValue = (val, m, bits) => {
                                const bMode = m % 3;
                                if (bMode === 0) return `0x${val.toString(16).toUpperCase()}`;
                                if (bMode === 1) return val.toString(10);
                                return `0b${val.toString(2).padStart(bits, '0')}`;
                            };
                            return (
                                <div className="cursor-pointer" onClick={cycleMode}>
                                    <div className="text-[11px] text-amber-800 font-bold mb-4 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                        Physical Address Construction
                                        <span className="text-[9px] font-normal opacity-50 ml-auto">Click to toggle format</span>
                                    </div>
                                    <div className="flex items-start gap-px">
                                        {isSV39 ? (
                                            <>
                                                {(() => {
                                                    const ppn2 = Number((pa >> 30n) & 0x3FFFFFFn);
                                                    const ppn1 = Number((pa >> 21n) & 0x1FFn);
                                                    const ppn0 = Number((pa >> 12n) & 0x1FFn);
                                                    const off = Number(pa & 0xFFFn);
                                                    
                                                    const isGigapage = leafLevel === 2;
                                                    const isMegapage = leafLevel === 1;
                                                    
                                                    const vpn1 = Number((va >> 21n) & 0x1FFn);
                                                    const vpn0 = Number((va >> 12n) & 0x1FFn);
                                                    return (
                                                        <>
                                                            <BitBox label="PPN[2]" bits={26} value={formatValue(ppn2, bitDiagramMode, 26)} color="bg-amber-100" bitRange={[30, 55]} />
                                                            {isGigapage ? (
                                                                <BitBox label="VPN[1] (VA)" bits={9} value={formatValue(vpn1, bitDiagramMode, 9)} color="bg-indigo-100" bitRange={[21, 29]} />
                                                            ) : (
                                                                <BitBox label="PPN[1]" bits={9} value={formatValue(ppn1, bitDiagramMode, 9)} color="bg-amber-100" bitRange={[21, 29]} />
                                                            )}
                                                            {(isGigapage || isMegapage) ? (
                                                                <BitBox label="VPN[0] (VA)" bits={9} value={formatValue(vpn0, bitDiagramMode, 9)} color="bg-indigo-100" bitRange={[12, 20]} />
                                                            ) : (
                                                                <BitBox label="PPN[0]" bits={9} value={formatValue(ppn0, bitDiagramMode, 9)} color="bg-amber-100" bitRange={[12, 20]} />
                                                            )}
                                                            <BitBox label="Page Offset" bits={12} value={formatValue(off, bitDiagramMode, 12)} color="bg-stone-100" bitRange={[0, 11]} />
                                                        </>
                                                    );
                                                })()}
                                            </>
                                        ) : (
                                            <>
                                                {(() => {
                                                    const ppn1 = Number((pa >> 22n) & 0xFFFn);
                                                    const ppn0 = Number((pa >> 12n) & 0x3FFn);
                                                    const off = Number(pa & 0xFFFn);
                                                    
                                                    const isMegapage = leafLevel === 1;
                                                    const vpn0 = Number((va >> 12n) & 0x3FFn);
                                                    return (
                                                        <>
                                                            <BitBox label="PPN[1]" bits={12} value={formatValue(ppn1, bitDiagramMode, 12)} color="bg-amber-100" bitRange={[22, 33]} />
                                                            {isMegapage ? (
                                                                <BitBox label="VPN[0] (VA)" bits={10} value={formatValue(vpn0, bitDiagramMode, 10)} color="bg-indigo-100" bitRange={[12, 21]} />
                                                            ) : (
                                                                <BitBox label="PPN[0]" bits={10} value={formatValue(ppn0, bitDiagramMode, 10)} color="bg-amber-100" bitRange={[12, 21]} />
                                                            )}
                                                            <BitBox label="Page Offset" bits={12} value={formatValue(off, bitDiagramMode, 12)} color="bg-stone-100" bitRange={[0, 11]} />
                                                        </>
                                                    );
                                                })()}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                         } else {
                            return renderBitFields("Physical Address Construction", "PA", pa);
                         }
                      })()}

                      <div className="flex flex-col md:flex-row items-center gap-6 mt-2 border-t border-amber-200/40 pt-6">
                        <div>
                           <div className="text-[10px] text-amber-700 font-bold mb-1 uppercase tracking-widest opacity-70">Final Physical Address (PA)</div>
                           <div className="font-mono text-2xl font-bold text-amber-900 bg-amber-200 px-5 py-2.5 rounded-xl shadow-inner border border-amber-300 break-all inline-block">
                             {translationResult.pa}
                           </div>
                        </div>
                        <div className="flex-1 bg-white/40 p-3 rounded-lg border border-amber-200/60 text-[11px] text-stone-600 leading-relaxed italic">
                           {(() => {
                               const leafLevel = translationResult.leafLevel;
                               const isSV39 = mode === 'SV39';
                               const isGigapage = isSV39 && leafLevel === 2;
                               const isMegapage = (isSV39 && leafLevel === 1) || (!isSV39 && leafLevel === 1);
                               const sizeText = isGigapage ? '1GB (Gigapage)' : (isMegapage ? (isSV39 ? '2MB (Megapage)' : '4MB (Megapage)') : '4KB (Page)');
                               const formula = isGigapage ? 'PA = (PPN[2] << 30) | (VPN[1:0] << 12) | Offset' :
                                              isMegapage ? (isSV39 ? 'PA = (PPN[2:1] << 21) | (VPN[0] << 12) | Offset' : 'PA = (PPN[1] << 22) | (VPN[0] << 12) | Offset') :
                                              'PA = (PPN << 12) | Offset';
                               return (
                                   <>
                                       This translation target is a <span className="font-bold text-amber-800">{sizeText}</span>. 
                                       The physical address is constructed by taking the PPN from the PTE and merging it with the untranslated VPN bits from the VA.
                                       <br />
                                       <span className="font-bold">Hardware Formula:</span> <code className="font-mono font-bold text-amber-900 ml-1">{formula}</code>
                                   </>
                               );
                           })()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
            } else {
                return (
                  <div className="w-full bg-red-50 rounded-xl shadow-sm border border-red-200 p-4 flex items-center gap-4 animate-in slide-in-from-top-2">
                      <AlertTriangle className="w-10 h-10 text-red-400 flex-shrink-0 m-0 mb-0" />
                      <div>
                        <h3 className="font-bold text-lg text-red-800">Page Fault / Access Error</h3>
                        <p className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-md inline-block mt-1">{translationResult.reason}</p>
                      </div>
                  </div>
                );
            }
        }

        if (selectedEntry) {
            if (selectedEntry.v === 0) {
                 return (
                  <div className="w-full bg-stone-50 rounded-xl shadow-sm border border-stone-200 p-4 flex items-center gap-4 animate-in fade-in">
                      <AlertTriangle className="w-10 h-10 text-stone-300 flex-shrink-0 m-0 mb-0" />
                      <div>
                        <h3 className="font-bold text-lg text-stone-600">Invalid PTE</h3>
                        <p className="text-sm text-stone-500">Valid bit is 0. This entry will trigger a Page Fault.</p>
                      </div>
                  </div>
                );
            } else if (isLeaf(selectedEntry)) {
                const themes = {
                    rose: {
                        bg: 'bg-rose-50', border: 'border-rose-200', headerBg: 'bg-rose-600',
                        textDark: 'text-rose-800', textVeryDark: 'text-rose-900',
                        badgeBg: 'bg-rose-200', badgeBorder: 'border-rose-300', panelBorder: 'border-rose-100'
                    },
                    emerald: {
                        bg: 'bg-emerald-50', border: 'border-emerald-200', headerBg: 'bg-emerald-600',
                        textDark: 'text-emerald-800', textVeryDark: 'text-emerald-900',
                        badgeBg: 'bg-emerald-200', badgeBorder: 'border-emerald-300', panelBorder: 'border-emerald-100'
                    },
                    amber: {
                        bg: 'bg-amber-50', border: 'border-amber-200', headerBg: 'bg-amber-600',
                        textDark: 'text-amber-800', textVeryDark: 'text-amber-900',
                        badgeBg: 'bg-amber-200', badgeBorder: 'border-amber-300', panelBorder: 'border-amber-100'
                    }
                };
                
                const leafSize = getEntrySize(mode, currentStep);
                const isGigapage = leafSize === 1n * GB;
                const isMegapage = leafSize === 2n * MB || leafSize === 4n * MB;
                
                const themeKey = isGigapage ? 'rose' : (isMegapage ? 'emerald' : 'amber');
                const t = themes[themeKey];
                const sizeText = isGigapage ? 'Gigapage' : (isMegapage ? 'Megapage' : '4KB Page');

                return (
                  <div className={`w-full ${t.bg} rounded-xl shadow-md border ${t.border} animate-in slide-in-from-top-2 overflow-hidden`}>
                    <div className={`${t.headerBg} text-white px-4 py-2 flex items-center gap-2 font-semibold text-sm`}>
                      <Cpu className="w-4 h-4"/> Leaf Reached (Physical Page Frame - {sizeText})
                    </div>
                    <div className="p-6 flex flex-col gap-8">
                      {/* Virtual Address breakdown */}
                      {(() => {
                             const vpns = mode === 'SV32' ? [null, null] : [null, null, null];
                             const currentVpnIdx = mode === 'SV32' ? 1 - currentStep : 2 - currentStep;
                             vpns[currentVpnIdx] = selectedEntry.index;

                             for (let i = currentStep; i > 0; i--) {
                               const parentPpn = explorerPath[i-1];
                               const childPpn = explorerPath[i];
                               const parentTable = memoryDB[mode].tables[parentPpn];
                               if (parentTable) {
                                 const entry = parentTable.find(e => e.ppn === childPpn && isPointer(e, i-1));
                                 if (entry) {
                                   const pLevelIdx = mode === 'SV32' ? 1 - (i-1) : 2 - (i-1);
                                   vpns[pLevelIdx] = entry.index;
                                 }
                               }
                             }
                             
                             const isSV39 = mode === 'SV39';
                             const isFullMode = bitDiagramMode >= 3;
                             const cycleMode = (e) => {
                                if (window.getSelection().toString().length > 0) return;
                                setBitDiagramMode((bitDiagramMode + 1) % 6);
                             };
                             const formatValue = (val, m, bits) => {
                                if (val === "xxxxx") return "xxxxx";
                                const bMode = m % 3;
                                if (bMode === 0) return `0x${val.toString(16).toUpperCase()}`;
                                if (bMode === 1) return val.toString(10);
                                return `0b${val.toString(2).padStart(bits, '0')}`;
                             };
                             const formatRange = (base, size, m, totalBits) => {
                                const bMode = m % 3;
                                const end = base + size - 1n;
                                if (bMode === 0) return `0x${base.toString(16).toUpperCase()} ~ 0x${end.toString(16).toUpperCase()}`;
                                if (bMode === 1) return `${base.toString(10)} ~ ${end.toString(10)}`;
                                return `0b${base.toString(2).padStart(totalBits, '0')} ~ 0b${end.toString(2).padStart(totalBits, '0')}`;
                             };

                             const leafSize = getEntrySize(mode, currentStep);
                             let vaBase = 0n;
                             if (mode === 'SV39') {
                                vaBase = (BigInt(vpns[2] || 0) << 30n) | (BigInt(vpns[1] || 0) << 21n) | (BigInt(vpns[0] || 0) << 12n);
                             } else {
                                vaBase = (BigInt(vpns[1] || 0) << 22n) | (BigInt(vpns[0] || 0) << 12n);
                             }

                             return (
                                <div className="cursor-pointer" onClick={cycleMode}>
                                    <div className={`text-[11px] ${t.textDark} font-bold mb-4 flex items-center gap-2`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${t.headerBg}`}></div>
                                        Virtual Address Range
                                        <span className="text-[9px] font-normal opacity-50 ml-auto">Click to toggle format</span>
                                    </div>
                                    <div className="flex items-start gap-px">
                                        {isFullMode ? (
                                            <BitBox label="Full VA Range" bits={isSV39 ? 39 : 32} value={formatRange(vaBase, leafSize, bitDiagramMode, isSV39 ? 39 : 32)} color="bg-indigo-50" bitRange={[0, isSV39 ? 38 : 31]} />
                                        ) : (
                                            isSV39 ? (
                                                <>
                                                    <BitBox label="VPN[2]" bits={9} value={formatValue(vpns[2] ?? "xxxxx", bitDiagramMode, 9)} color="bg-indigo-50" bitRange={[30, 38]} subLabel={vpns[2] !== null ? `Index: ${vpns[2]}` : null} />
                                                    <BitBox label="VPN[1]" bits={9} value={formatValue(vpns[1] ?? "xxxxx", bitDiagramMode, 9)} color="bg-indigo-50" bitRange={[21, 29]} subLabel={vpns[1] !== null ? `Index: ${vpns[1]}` : null} />
                                                    <BitBox label="VPN[0]" bits={9} value={formatValue(vpns[0] ?? "xxxxx", bitDiagramMode, 9)} color="bg-indigo-50" bitRange={[12, 20]} subLabel={vpns[0] !== null ? `Index: ${vpns[0]}` : null} />
                                                    <BitBox label="Page Offset" bits={12} value="xxxxx" color="bg-stone-100" bitRange={[0, 11]} />
                                                </>
                                            ) : (
                                                <>
                                                    <BitBox label="VPN[1]" bits={10} value={formatValue(vpns[1] ?? "xxxxx", bitDiagramMode, 10)} color="bg-indigo-50" bitRange={[22, 31]} subLabel={vpns[1] !== null ? `Index: ${vpns[1]}` : null} />
                                                    <BitBox label="VPN[0]" bits={10} value={formatValue(vpns[0] ?? "xxxxx", bitDiagramMode, 10)} color="bg-indigo-50" bitRange={[12, 21]} subLabel={vpns[0] !== null ? `Index: ${vpns[0]}` : null} />
                                                    <BitBox label="Page Offset" bits={12} value="xxxxx" color="bg-stone-100" bitRange={[0, 11]} />
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
                             );
                      })()}

                      <div className="flex justify-center -my-4 relative z-10">
                         <div className={`${t.bg} ${t.textDark} px-3 py-1 rounded-full text-[10px] font-bold border ${t.border} shadow-sm flex items-center gap-2`}>
                            <span>Maps to Physical Page Frame</span>
                            <ChevronDown className="w-3 h-3" />
                         </div>
                      </div>

                      {/* Physical Address construction */}
                      {(() => {
                             const ppn = selectedEntry.ppn;
                             const isSV39 = mode === 'SV39';
                             const isFullMode = bitDiagramMode >= 3;
                             const cycleMode = (e) => {
                                if (window.getSelection().toString().length > 0) return;
                                setBitDiagramMode((bitDiagramMode + 1) % 6);
                             };
                             const leafSize = getEntrySize(mode, currentStep);
                             const formatValue = (val, m, bits) => {
                                if (val === "xxxxx") return "xxxxx";
                                const bMode = m % 3;
                                if (bMode === 0) return `0x${val.toString(16).toUpperCase()}`;
                                if (bMode === 1) return val.toString(10);
                                return `0b${val.toString(2).padStart(bits, '0')}`;
                             };
                             const formatRange = (base, size, m, totalBits) => {
                                const bMode = m % 3;
                                const end = base + size - 1n;
                                if (bMode === 0) return `0x${base.toString(16).toUpperCase()} ~ 0x${end.toString(16).toUpperCase()}`;
                                if (bMode === 1) return `${base.toString(10)} ~ ${end.toString(10)}`;
                                return `0b${base.toString(2).padStart(totalBits, '0')} ~ 0b${end.toString(2).padStart(totalBits, '0')}`;
                             };

                             return (
                                <div className="cursor-pointer" onClick={cycleMode}>
                                    <div className={`text-[11px] ${t.textDark} font-bold mb-4 flex items-center gap-2`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${t.headerBg}`}></div>
                                        Physical Address Construction
                                        <span className="text-[9px] font-normal opacity-50 ml-auto">Click to toggle format</span>
                                    </div>
                                    <div className="flex items-start gap-px">
                                        {isFullMode ? (
                                            <BitBox label="Full PA Range" bits={isSV39 ? 56 : 34} value={formatRange(BigInt(ppn) << 12n, leafSize, bitDiagramMode, isSV39 ? 56 : 34)} color={t.badgeBg} bitRange={[0, isSV39 ? 55 : 33]} />
                                        ) : (
                                            isSV39 ? (
                                                <>
                                                    {(() => {
                                                        const p2 = Number((BigInt(ppn) >> 18n) & 0x3FFFFFFn);
                                                        const p1 = Number((BigInt(ppn) >> 9n) & 0x1FFn);
                                                        const p0 = Number(BigInt(ppn) & 0x1FFn);
                                                        return (
                                                            <>
                                                                <BitBox label="PPN[2]" bits={26} value={formatValue(p2, bitDiagramMode, 26)} color={t.badgeBg} bitRange={[30, 55]} />
                                                                {isGigapage ? (
                                                                    <BitBox label="VPN[1] (VA)" bits={9} value="xxxxx" color="bg-indigo-100" bitRange={[21, 29]} />
                                                                ) : (
                                                                    <BitBox label="PPN[1]" bits={9} value={formatValue(p1, bitDiagramMode, 9)} color={t.badgeBg} bitRange={[21, 29]} />
                                                                )}
                                                                {(isGigapage || isMegapage) ? (
                                                                    <BitBox label="VPN[0] (VA)" bits={9} value="xxxxx" color="bg-indigo-100" bitRange={[12, 20]} />
                                                                ) : (
                                                                    <BitBox label="PPN[0]" bits={9} value={formatValue(p0, bitDiagramMode, 9)} color={t.badgeBg} bitRange={[12, 20]} />
                                                                )}
                                                                <BitBox label="Page Offset" bits={12} value="xxxxx" color="bg-stone-100" bitRange={[0, 11]} />
                                                            </>
                                                        );
                                                    })()}
                                                </>
                                            ) : (
                                                <>
                                                    {(() => {
                                                        const p1 = Number((BigInt(ppn) >> 10n) & 0xFFFn);
                                                        const p0 = Number(BigInt(ppn) & 0x3FFn);
                                                        return (
                                                            <>
                                                                <BitBox label="PPN[1]" bits={12} value={formatValue(p1, bitDiagramMode, 12)} color={t.badgeBg} bitRange={[22, 33]} />
                                                                {isMegapage ? (
                                                                    <BitBox label="VPN[0] (VA)" bits={10} value="xxxxx" color="bg-indigo-100" bitRange={[12, 21]} />
                                                                ) : (
                                                                    <BitBox label="PPN[0]" bits={10} value={formatValue(p0, bitDiagramMode, 10)} color={t.badgeBg} bitRange={[12, 21]} />
                                                                )}
                                                                <BitBox label="Page Offset" bits={12} value="xxxxx" color="bg-stone-100" bitRange={[0, 11]} />
                                                            </>
                                                        );
                                                    })()}
                                                </>
                                            )
                                        )}
                                    </div>
                                </div>
                             );
                      })()}

                      <div className="flex flex-col md:flex-row items-center gap-6 mt-2 border-t border-stone-200/40 pt-6">
                        <div>
                           <div className={`text-[10px] ${t.textDark} font-bold mb-1 uppercase tracking-widest opacity-70`}>Target Physical Page Number (PPN)</div>
                           <div className={`font-mono text-2xl font-bold ${t.textVeryDark} ${t.badgeBg} px-5 py-2.5 rounded-xl shadow-inner border ${t.badgeBorder} break-all inline-block`}>
                             0x{selectedEntry.ppn.toString(16).toUpperCase()}
                           </div>
                        </div>
                        <div className={`flex-1 bg-white/40 p-3 rounded-lg border ${t.panelBorder} text-[11px] ${t.textDark} leading-relaxed italic`}>
                           This PTE points to physical page frame 0x{selectedEntry.ppn.toString(16).toUpperCase()}. 
                           The mapping size is {isGigapage ? '1GB (Gigapage)' : (isMegapage ? (mode === 'SV39' ? '2MB (Megapage)' : '4MB (Megapage)') : '4KB (Page)')}.
                           <br />
                           <span className="font-bold">Hardware Formula:</span> <code className={`font-mono font-bold ${t.textVeryDark} ml-1`}>
                             {isGigapage ? `PA = (PPN[2] << 30) | (VPN[1:0] << 12) | Offset` :
                              isMegapage ? (mode === 'SV39' ? `PA = (PPN[2:1] << 21) | (VPN[0] << 12) | Offset` : `PA = (PPN[1] << 22) | (VPN[0] << 12) | Offset`) :
                              `PA = (PPN << 12) | Offset`}
                           </code>
                        </div>
                      </div>
                    </div>
                  </div>
                );
            }
        }

        return (
            <div className="w-full bg-stone-50 rounded-lg border border-dashed border-stone-300 p-3 text-center text-stone-500 text-sm flex items-center justify-center gap-2">
                <Layers className="w-5 h-5 text-stone-400" />
                <span>Click a <strong>page table entry</strong> to explore the next-level table or view the <strong>leaf PTE's</strong> physical memory mapping.</span>
            </div>
        );
      };

      const EditModal = () => {
        if (!editingPte) return null;
        const [formData, setFormData] = useState(editingPte.entry);
        const [showLimitWarning, setShowLimitWarning] = useState(false);
        
        const [paInput, setPaInput] = useState(() => {
            const ppnBigInt = BigInt(editingPte.entry.ppn || 0);
            return (ppnBigInt * 4096n).toString(16).toUpperCase();
        });

        const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value }));
        };

        const handlePaChange = (e) => {
            let val = e.target.value.replace(/^0x/i, '').replace(/[^0-9A-Fa-f]/gi, '');
            if (val === '') {
                setPaInput('');
                setShowLimitWarning(false);
                return;
            }
            try {
                const paBigInt = BigInt('0x' + val);
                const limitPa = mode === 'SV32' ? 0x3FFFFFFFFn : 0x1FFFFFFFFFFFn;
                if (paBigInt > limitPa) { setShowLimitWarning(true); return; }
                setShowLimitWarning(false);
                setPaInput(val);
            } catch (err) {}
        };

        const handleSave = () => {
          let paBigInt = 0n;
          try { paBigInt = BigInt('0x' + (paInput || '0')); } catch (e) {}
          const ppnVal = Number(paBigInt >> 12n);
          savePte({ ...formData, ppn: ppnVal });
        };

        let paBigInt = 0n;
        try { paBigInt = BigInt('0x' + (paInput || '0')); } catch (e) {}
        const previewPpn = paBigInt >> 12n;
        const segs = getPpnSegments(previewPpn);
        const offset = paBigInt & 0xFFFn;

        return (
          <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-[1rem] shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
              
              <div className="bg-stone-800 p-4 flex justify-between items-center text-white flex-shrink-0">
                <h3 className="font-bold flex items-center gap-2"><Database className="w-5 h-5 text-stone-600" />Edit PTE</h3>
                <span className="text-sm bg-stone-700 px-3 py-1 rounded-full font-mono font-bold text-stone-200 shadow-inner">
                  Index: {(() => {
                      const idxBits = mode === 'SV32' ? 10 : 9;
                      if (indexFormat === 'DEC') return `${idxBits}'d${formData.index.toString(10)}`;
                      if (indexFormat === 'HEX') return `${idxBits}'h${formData.index.toString(16).toUpperCase()}`;
                      if (indexFormat === 'BIN') return `${idxBits}'b${formData.index.toString(2).padStart(idxBits, '0')}`;
                  })()}
                </span>
              </div>
              
              <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <label className="block text-xs font-bold text-stone-500 mb-3 uppercase tracking-wide">Flags & Status</label>
                  <div className="grid grid-cols-4 gap-4">
                    {['v', 'r', 'w', 'x', 'u', 'g', 'a', 'd'].map(bit => (
                      <label key={bit} className="flex items-center gap-2 cursor-pointer bg-white p-2 rounded border border-stone-200 hover:border-stone-300 shadow-[0_2px_4px_rgb(0,0,0,0.02)]">
                        <input type="checkbox" name={bit} checked={formData[bit] === 1} onChange={handleChange} className="w-4 h-4 text-stone-900 rounded" />
                        <span className="font-mono font-bold text-sm uppercase text-stone-700">{bit}</span>
                      </label>
                    ))}
                  </div>
                  {currentStep >= maxStep && (
                    <div className="mt-3 text-[11px] text-red-600 font-bold bg-red-50 p-2 rounded border border-red-100">
                        ⚠️ <strong>Architecture Limit</strong>: This is the lowest hardware level. R, W, and X cannot all be zero.
                    </div>
                  )}
                </div>

                <div className="bg-stone-100 p-4 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-end mb-2">
                      <label className="block text-xs font-bold text-blue-800 uppercase tracking-wide">Target Physical Address (PA, Hex)</label>
                      <span className="text-[10px] text-stone-900 font-bold bg-stone-100 px-2 py-0.5 rounded">
                          Limit: {mode === 'SV32' ? '16GB' : '2TB'}
                      </span>
                  </div>
                  
                  <div className="flex shadow-[0_2px_4px_rgb(0,0,0,0.02)]">
                    <span className="inline-flex items-center px-4 text-sm text-stone-800 bg-stone-100 border border-r-0 border-stone-200 rounded-l-md font-mono font-bold">0x</span>
                    <input 
                      type="text" 
                      value={paInput} 
                      onChange={handlePaChange}
                      className={`rounded-none rounded-r-md bg-white border ${showLimitWarning ? 'border-red-400 ring-2 ring-red-200' : 'border-stone-200 focus:ring-stone-400'} text-stone-900 block flex-1 w-full p-2.5 font-mono uppercase font-bold text-lg transition-all`} 
                      placeholder="Enter Physical Address..."
                    />
                  </div>
                  
                  {showLimitWarning && (
                     <div className="mt-2 text-[11px] text-red-600 font-bold animate-pulse">
                        ⚠️ Input Rejected: Reached hardware physical memory limit.
                     </div>
                  )}
                  
                  <div className="mt-3 bg-white p-3 rounded-lg border border-blue-100 shadow-inner">
                     <div className="text-[10px] text-stone-500 font-bold mb-2">Hardware PPN Translation Preview (PA &gt;&gt; 12)</div>
                     
                     <div className="flex justify-between items-center mb-2">
                         <div className="font-mono text-[13px] font-bold text-stone-800 bg-stone-100 px-2 py-1 rounded">
                            PPN: 0x{previewPpn.toString(16).toUpperCase()}
                         </div>
                     </div>
                     
                     <div className="flex text-[11px] font-mono font-bold text-center border border-stone-200 rounded overflow-hidden divide-x divide-blue-200">
                        {mode === 'SV39' && <div className="flex-1 bg-indigo-50 text-indigo-800 py-1">PPN[2]: {(segs.ppn2 || 0n).toString(16).toUpperCase()}</div>}
                        <div className="flex-1 bg-stone-100 text-blue-800 py-1">PPN[1]: {(segs.ppn1 || 0n).toString(16).toUpperCase()}</div>
                        <div className="flex-1 bg-sky-50 text-sky-800 py-1">PPN[0]: {(segs.ppn0 || 0n).toString(16).toUpperCase()}</div>
                     </div>

                     {offset > 0n && (
                         <div className="mt-3 text-[11px] text-amber-700 font-bold bg-amber-50 p-2 rounded border border-amber-200 leading-relaxed">
                             ⚠️ <strong>Alignment Warning</strong>: Page Tables can only address 4KB aligned frames. The lower 12 bits (<code className="bg-amber-200 px-1 rounded">0x{offset.toString(16).toUpperCase()}</code>) will be discarded by hardware.
                         </div>
                     )}
                  </div>
                </div>
              </div>
              
              <div className="bg-stone-100 px-6 py-4 flex justify-end gap-3 border-t border-stone-200 flex-shrink-0">
                <button onClick={() => setEditingPte(null)} className="px-5 py-2 text-sm font-bold text-stone-600 bg-white border border-stone-300 rounded-lg hover:bg-stone-50">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2 text-sm font-bold text-white bg-stone-900 rounded-lg hover:bg-stone-800 shadow-[0_4px_12px_rgb(0,0,0,0.02)]">Save Changes</button>
              </div>
            </div>
          </div>
        );
      };

      const BulkEditModal = () => {
        if (!bulkEditTableInfo) return null;
        
        const [flags, setFlags] = useState({ v: 1, r: 1, w: 1, x: 0, u: 0, g: 0, a: 1, d: 1 });
        const [idxFormat, setIdxFormat] = useState('DEC');
        const [startIdxInput, setStartIdxInput] = useState('0');
        const [endIdxInput, setEndIdxInput] = useState(mode === 'SV32' ? '1023' : '511');
        const [updatePa, setUpdatePa] = useState(true);
        const [startPaInput, setStartPaInput] = useState('0');
        
        const maxIndex = mode === 'SV32' ? 1023 : 511;
        const stepSize = getEntrySize(mode, bulkEditTableInfo.step);
        const limitPa = mode === 'SV32' ? 0x3FFFFFFFFn : 0x1FFFFFFFFFFFn;

        const radix = idxFormat === 'DEC' ? 10 : 16;
        let startIdxNum = parseInt(startIdxInput, radix);
        if (isNaN(startIdxNum)) startIdxNum = 0;
        let endIdxNum = parseInt(endIdxInput, radix);
        if (isNaN(endIdxNum)) endIdxNum = 0;
        
        let countNum = endIdxNum - startIdxNum + 1;
        if (countNum < 1) countNum = 0;
        
        const isIdxValid = startIdxNum >= 0 && endIdxNum <= maxIndex && startIdxNum <= endIdxNum;

        let startPaBigInt = 0n;
        try { startPaBigInt = BigInt('0x' + (startPaInput || '0')); } catch(e) {}
        
        const endPaBigInt = startPaBigInt + BigInt(Math.max(0, countNum - 1)) * stepSize;
        const isPaOutOfBound = updatePa && (endPaBigInt > limitPa);

        const handleFlagChange = (e) => {
            const { name, checked } = e.target;
            setFlags(prev => ({ ...prev, [name]: checked ? 1 : 0 }));
        };

        const handleStartPaChange = (e) => {
            let val = e.target.value.replace(/^0x/i, '').replace(/[^0-9A-Fa-f]/gi, '');
            setStartPaInput(val);
        };

        const handleSave = () => {
            if (!isIdxValid || isPaOutOfBound || countNum === 0) return;
            handleBulkSave({ startIndexNum: startIdxNum, countNum, flags, startPaBigInt, updatePa });
        };

        const formatBytes = (bytes) => {
            if (bytes >= 1n * GB) return `${Number(bytes / GB)} GB`;
            if (bytes >= 1n * MB) return `${Number(bytes / MB)} MB`;
            return `${Number(bytes / KB)} KB`;
        };

        return (
          <div className="fixed inset-0 bg-stone-900/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-[1rem] shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
              
              <div className="bg-indigo-800 p-4 flex justify-between items-center text-white flex-shrink-0">
                <h3 className="font-bold flex items-center gap-2 text-lg"><SettingsIcon className="w-5 h-5 text-indigo-300" /> Edit Page Table</h3>
                <span className="text-sm bg-indigo-900 px-3 py-1 rounded-full font-mono font-bold text-indigo-200 shadow-inner border border-indigo-700">
                  Table Physical Address: 0x{(BigInt(bulkEditTableInfo.tablePpn) << 12n).toString(16).toUpperCase()}
                </span>
              </div>
              
              <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar bg-stone-50">
                
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-[0_2px_4px_rgb(0,0,0,0.02)]">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                       <span className="bg-stone-200 text-stone-600 px-2 py-0.5 rounded text-xs">Step 1</span> Select Index Range
                    </label>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        const currentStart = parseInt(startIdxInput, idxFormat === 'DEC' ? 10 : 16);
                        const currentEnd = parseInt(endIdxInput, idxFormat === 'DEC' ? 10 : 16);
                        const newFormat = idxFormat === 'DEC' ? 'HEX' : 'DEC';
                        setIdxFormat(newFormat);
                        if (!isNaN(currentStart)) setStartIdxInput(currentStart.toString(newFormat === 'DEC' ? 10 : 16).toUpperCase());
                        if (!isNaN(currentEnd)) setEndIdxInput(currentEnd.toString(newFormat === 'DEC' ? 10 : 16).toUpperCase());
                      }}
                      className="px-3 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-600 text-[11px] font-mono font-bold rounded cursor-pointer transition-colors flex items-center gap-1 shadow-[0_2px_4px_rgb(0,0,0,0.02)]"
                    >
                      Switch to: {idxFormat === 'DEC' ? 'Hexadecimal (HEX)' : 'Decimal (DEC)'}
                    </button>
                  </div>
                  
                  <div className="flex gap-3">
                      <div className="flex-1">
                          <label className="block text-xs font-bold text-stone-500 mb-1">Start Index {idxFormat === 'HEX' && '(Hex)'}</label>
                          <div className="flex shadow-sm">
                              {idxFormat === 'HEX' && <span className="inline-flex items-center px-3 text-sm text-stone-500 bg-stone-100 border border-r-0 border-stone-300 rounded-l-md font-mono">0x</span>}
                              <input type="text" value={startIdxInput} onChange={e => setStartIdxInput(e.target.value)} className={`${idxFormat === 'HEX' ? 'rounded-r-md' : 'rounded-md'} border border-stone-300 w-full p-2 font-mono ${idxFormat === 'HEX' ? 'uppercase' : ''} focus:ring-indigo-500 focus:border-indigo-500 transition-colors`} placeholder={idxFormat === 'DEC' ? '0' : '00'} />
                          </div>
                      </div>
                      <div className="flex items-end pb-2 justify-center font-bold text-stone-400">~</div>
                      <div className="flex-1">
                          <label className="block text-xs font-bold text-stone-500 mb-1">End Index {idxFormat === 'HEX' && '(Hex)'}</label>
                          <div className="flex shadow-sm">
                              {idxFormat === 'HEX' && <span className="inline-flex items-center px-3 text-sm text-stone-500 bg-stone-100 border border-r-0 border-stone-300 rounded-l-md font-mono">0x</span>}
                              <input type="text" value={endIdxInput} onChange={e => setEndIdxInput(e.target.value)} className={`${idxFormat === 'HEX' ? 'rounded-r-md' : 'rounded-md'} border border-stone-300 w-full p-2 font-mono ${idxFormat === 'HEX' ? 'uppercase' : ''} focus:ring-indigo-500 focus:border-indigo-500 transition-colors`} placeholder={idxFormat === 'DEC' ? maxIndex.toString(10) : maxIndex.toString(16).toUpperCase()} />
                          </div>
                      </div>
                  </div>
                  <div className="mt-3 text-xs flex justify-between font-mono font-bold">
                      <span className={isIdxValid ? "text-indigo-600" : "text-red-500"}>
                          Count: {countNum} entries ({idxFormat === 'HEX' ? `0x${startIdxNum.toString(16).toUpperCase()} ~ 0x${endIdxNum.toString(16).toUpperCase()}` : `${startIdxNum} ~ ${endIdxNum}`})
                      </span>
                      <span className="text-stone-400">Table Limit: {idxFormat === 'HEX' ? `0x${maxIndex.toString(16).toUpperCase()}` : maxIndex.toString(10)}</span>
                  </div>
                  {!isIdxValid && <div className="mt-1 text-xs text-red-500 font-bold">⚠️ Error: Invalid range or exceeds table capacity!</div>}
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-[0_2px_4px_rgb(0,0,0,0.02)]">
                  <label className="block text-sm font-bold text-stone-700 mb-3 flex items-center gap-2">
                     <span className="bg-stone-200 text-stone-600 px-2 py-0.5 rounded text-xs">Step 2</span> Global Flag Configuration
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    {['v', 'r', 'w', 'x', 'u', 'g', 'a', 'd'].map(bit => (
                      <label key={`bulk-${bit}`} className="flex items-center justify-center gap-1.5 cursor-pointer bg-stone-50 p-2 rounded border border-stone-200 hover:border-indigo-400">
                        <input type="checkbox" name={bit} checked={flags[bit] === 1} onChange={handleFlagChange} className="w-3.5 h-3.5 text-indigo-600 rounded" />
                        <span className="font-mono font-bold text-sm uppercase text-stone-700">{bit}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={`p-5 rounded-xl border shadow-[0_2px_4px_rgb(0,0,0,0.02)] transition-all ${updatePa ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-stone-200'}`}>
                  <label className="flex items-center gap-2 mb-4 cursor-pointer">
                      <input type="checkbox" checked={updatePa} onChange={e => setUpdatePa(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
                      <span className="font-bold text-stone-800 text-sm">Sequential Physical Mapping</span>
                  </label>
                  
                  {updatePa && (
                      <div className="space-y-4 animate-in slide-in-from-top-2">
                          <div>
                              <label className="block text-xs font-bold text-indigo-800 mb-1">Start Physical Address (Start PA, Hex)</label>
                              <div className="flex">
                                <span className="inline-flex items-center px-4 text-sm text-indigo-700 bg-indigo-100 border border-r-0 border-indigo-200 rounded-l-md font-mono font-bold">0x</span>
                                <input type="text" value={startPaInput} onChange={handleStartPaChange} className={`rounded-none rounded-r-md bg-white border ${isPaOutOfBound ? 'border-red-400 ring-2 ring-red-200' : 'border-indigo-200 focus:ring-indigo-500'} text-stone-900 block flex-1 w-full p-2.5 font-mono uppercase font-bold text-lg`} placeholder="Enter Address..." />
                              </div>
                          </div>

                          <div className="bg-white p-3 rounded-lg border border-indigo-100 flex flex-col gap-2">
                              <div className="flex justify-between items-center text-xs font-bold">
                                  <span className="text-stone-500">Entry Size for this Level (Step)</span>
                                  <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">{formatBytes(stepSize)}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs font-bold">
                                  <span className="text-stone-500">Estimated Contiguous Space</span>
                                  <span className="text-stone-700">{formatBytes(stepSize * BigInt(countNum))}</span>
                              </div>
                              <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs font-mono font-bold">
                                  <span className="text-stone-400">End PA</span>
                                  <span className={isPaOutOfBound ? "text-red-500" : "text-indigo-600"}>
                                      0x{endPaBigInt.toString(16).toUpperCase()}
                                  </span>
                              </div>
                          </div>

                          {isPaOutOfBound && (
                              <div className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded border border-red-200">
                                  ⚠️ <strong>Hardware Limit Warning</strong>: End address exceeds hardware limits ({mode === 'SV32' ? '16GB' : '2TB'}).
                              </div>
                          )}
                          
                          {(startPaBigInt & 0xFFFn) > 0n && (
                              <div className="text-xs text-amber-700 font-bold bg-amber-50 p-2.5 rounded border border-amber-200">
                                  ⚠️ <strong>Alignment Warning</strong>: Start PA is not 4KB aligned. Hardware will discard the lower 12 bits when writing to PPN.
                              </div>
                          )}
                      </div>
                  )}
                  {!updatePa && (
                      <p className="text-xs text-stone-500 font-bold">Auto-increment disabled. Only flags will be updated; existing PPN values will be preserved.</p>
                  )}
                </div>

              </div>
              
              <div className="bg-stone-100 px-6 py-4 flex justify-between items-center border-t border-stone-200 flex-shrink-0">
                <div className="text-xs font-bold text-stone-500">
                    Will affect {countNum} entries
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setBulkEditTableInfo(null)} className="px-5 py-2 text-sm font-bold text-stone-600 bg-white border border-stone-300 rounded-lg hover:bg-stone-50">Cancel</button>
                    <button 
                        onClick={handleSave} 
                        disabled={!isIdxValid || isPaOutOfBound}
                        className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-[0_4px_12px_rgb(0,0,0,0.02)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Apply Table Changes
                    </button>
                </div>
              </div>
            </div>
          </div>
        );
      };

      return (
        <div className="min-h-screen p-4 md:p-8 bg-[#F5F5F4] font-sans text-stone-800">
          <EditModal />
          <BulkEditModal />
          <div className="max-w-[1500px] mx-auto space-y-6">
            
            <header className="bg-white p-6 rounded-[1rem] shadow-[0_2px_4px_rgb(0,0,0,0.02)] border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-stone-900 mb-2">
                  Page Table Toy: RISC-V Virtual Address Translation Visualizer
                </h1>
                <div className="space-y-2">
                  <p className="text-stone-700 text-sm leading-relaxed max-w-4xl">
                    Learn how <strong>RISC-V virtual memory</strong> and page tables work (Sv32 & Sv39) through interactive visualizations. 
                    This tool shows you exactly how virtual addresses are mapped to physical memory, step by step.
                  </p>
                  <p className="text-stone-500 text-[12px] leading-relaxed">
                    <span className="font-bold text-stone-400 mr-2 uppercase tracking-tighter">Tip:</span>
                    The right side is the <strong>Physical Memory Viewport</strong>. Use the <strong>+ / - buttons</strong> to zoom into micro views. Drag to navigate.
                    <button 
                      onClick={() => setShowGuide(!showGuide)}
                      className="ml-3 text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-800 border-b border-indigo-200 hover:border-indigo-600 transition-all inline-block"
                    >
                      {showGuide ? '[ Hide System Guide ]' : '[ Show System Guide ]'}
                    </button>
                  </p>
                </div>
                
                {showGuide && (
                  <div className="mt-6 p-6 bg-stone-50 border border-stone-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[12px] leading-relaxed text-stone-700">
                      <section>
                        <h4 className="font-bold text-stone-900 mb-3 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1.5 h-3 bg-stone-800"></div> Architecture Overview
                        </h4>
                        <p className="mb-4 font-serif italic text-stone-500">
                          This visualizer demonstrates the hardware-level address translation for RISC-V privileged architectures.
                        </p>
                        <ul className="space-y-2 list-disc pl-4">
                          <li><strong>Sv32</strong>: 32-bit Virtual Address (VA) mapped to 34-bit Physical Address (PA). Supports 2-level paging (10-10-12 bits).</li>
                          <li><strong>Sv39</strong>: 39-bit Virtual Address (VA) mapped to up to 56-bit Physical Address (PA). Supports 3-level paging (9-9-9-12 bits).</li>
                          <li><strong>Mechanism</strong>: The MMU traverses the Page Table hierarchy starting from the base address in the <code className="bg-stone-200 px-1 rounded">satp</code> register.</li>
                        </ul>
                      </section>
                      
                      <section>
                        <h4 className="font-bold text-stone-900 mb-3 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1.5 h-3 bg-stone-800"></div> Memory Constraints
                        </h4>
                        <div className="bg-white border border-stone-200 p-4 font-mono text-[11px] space-y-3 shadow-sm">
                          <div>
                            <div className="text-stone-400 mb-1">// Max Physical Addressing in this Tool</div>
                            <div>SV32: 2^34 bytes = <span className="text-indigo-600">16.0 GB</span></div>
                            <div>SV39: 2^41 bytes = <span className="text-indigo-600">2.0 TB</span></div>
                          </div>
                          <div className="pt-2 border-t border-stone-100">
                            <div className="text-stone-400 mb-1">// Page Table Entry (PTE) Alignment</div>
                            <div>PTE Size: {mode === 'SV32' ? '4' : '8'} Bytes</div>
                            <div>Base Address: Must be 4KB (4096-byte) aligned</div>
                          </div>
                        </div>
                      </section>

                      <section className="md:col-span-2 pt-4 border-t border-stone-200">
                        <h4 className="font-bold text-stone-900 mb-3 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1.5 h-3 bg-stone-800"></div> Default Example (Page Table Structure)
                        </h4>
                        
                        {mode === 'SV39' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-[11px]">
                            <div className="bg-white p-3 border border-stone-200 rounded shadow-sm">
                              <div className="text-indigo-600 font-bold border-b border-stone-100 pb-1 mb-2">LV2 (Root) @ 1TB</div>
                              <ul className="space-y-1">
                                <li>• <span className="text-stone-400">Idx [1]:</span> Points to L1 Table</li>
                                <li>• <span className="text-stone-400">Others:</span> 1GB Pages (Mapped from PA 0x0)</li>
                              </ul>
                            </div>
                            <div className="bg-white p-3 border border-stone-200 rounded shadow-sm">
                              <div className="text-indigo-600 font-bold border-b border-stone-100 pb-1 mb-2">LV1 @ 1TB + 4KB</div>
                              <ul className="space-y-1">
                                <li>• <span className="text-stone-400">Idx [1]:</span> Points to L0 Table</li>
                                <li>• <span className="text-stone-400">Others:</span> 2MB Pages (Mapped from PA 1GB)</li>
                              </ul>
                            </div>
                            <div className="bg-white p-3 border border-stone-200 rounded shadow-sm">
                              <div className="text-indigo-600 font-bold border-b border-stone-100 pb-1 mb-2">LV0 @ 1TB + 8KB</div>
                              <ul className="space-y-1">
                                <li>• <span className="text-stone-400">Idx [0-511]:</span> 4KB Pages (Mapped from PA 1GB+2MB)</li>
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-[11px]">
                            <div className="bg-white p-3 border border-stone-200 rounded shadow-sm">
                              <div className="text-indigo-600 font-bold border-b border-stone-100 pb-1 mb-2">LV1 (Root) @ 8GB</div>
                              <ul className="space-y-1">
                                <li>• <span className="text-stone-400">Idx [1]:</span> Points to L0 Table</li>
                                <li>• <span className="text-stone-400">Others:</span> 4MB Pages (Mapped from PA 0x0)</li>
                              </ul>
                            </div>
                            <div className="bg-white p-3 border border-stone-200 rounded shadow-sm">
                              <div className="text-indigo-600 font-bold border-b border-stone-100 pb-1 mb-2">LV0 @ 8GB + 4KB</div>
                              <ul className="space-y-1">
                                <li>• <span className="text-stone-400">Idx [0-1023]:</span> 4KB Pages (Mapped from PA 2MB)</li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </section>

                      <section className="md:col-span-2 pt-4 border-t border-stone-200">
                        <h4 className="font-bold text-stone-900 mb-3 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1.5 h-3 bg-stone-800"></div> User Tools & Interaction
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-[11px] leading-relaxed">
                          <div className="bg-stone-50 p-4 border border-stone-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-indigo-800 font-bold mb-2 uppercase tracking-tight flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5" /> VA Translation
                            </div>
                            <p className="text-stone-600 mb-3 italic">Enter a hex address (e.g., 0x1234) and click <span className="bg-stone-900 text-white px-2 py-0.5 rounded text-[9px] font-bold">Translate</span> to simulate hardware walking.</p>
                            <ul className="space-y-2">
                              <li>• <span className="text-stone-900 font-bold">Address Conversion:</span> Automatically maps the Virtual Address (VA) to its corresponding Physical Address (PA) based on current table data.</li>
                              <li>• <span className="text-stone-900 font-bold">Path Visualization:</span> The tool will instantly navigate to the correct tables and highlight the translation path in the UI.</li>
                            </ul>
                          </div>
                          <div className="bg-stone-50 p-4 border border-stone-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-indigo-800 font-bold mb-2 uppercase tracking-tight flex items-center gap-1.5">
                              <SettingsIcon className="w-3.5 h-3.5" /> Edit Page Table (Batch)
                            </div>
                            <p className="text-stone-600 mb-3 italic">Click the "Edit Page Table" button on the left to modify multiple entries at once.</p>
                            <ul className="space-y-2">
                              <li>• <span className="text-stone-900 font-bold">Index Range:</span> Define the start and end indices of the entries you want to update.</li>
                              <li>• <span className="text-stone-900 font-bold">Sequential Mapping:</span> Automatically maps the range to a contiguous physical block starting from your "Base PA".</li>
                            </ul>
                          </div>
                          <div className="bg-stone-50 p-4 border border-stone-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-indigo-800 font-bold mb-2 uppercase tracking-tight flex items-center gap-1.5">
                              <EditIcon className="w-3.5 h-3.5" /> Edit Individual PTE
                            </div>
                            <p className="text-stone-600 mb-3 italic">Click the pencil icon <EditIcon className="inline w-3 h-3" /> on any row to modify a single entry attributes.</p>
                            <ul className="space-y-2">
                              <li>• <span className="text-stone-900 font-bold">Attribute Configuration:</span> Toggle V, R, W, X, A, D bits.</li>
                              <li>• <span className="text-stone-900 font-bold">Hierarchical Link:</span> Provide a physical address to automatically link and allocate a sub-table.</li>
                            </ul>
                          </div>
                          <div className="bg-stone-50 p-4 border border-stone-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-indigo-800 font-bold mb-2 uppercase tracking-tight flex items-center gap-1.5">
                              <EditIcon className="w-3.5 h-3.5" /> Table Relocation
                            </div>
                            <p className="text-stone-600 mb-3 italic">Click the <span className="bg-indigo-100 px-1.5 py-0.5 rounded text-indigo-700 border border-indigo-200 font-bold text-[9px]">Table Physical Address</span> badge to move a table.</p>
                            <ul className="space-y-2">
                              <li>• <span className="text-stone-900 font-bold">Relocate (Move):</span> Change where the table resides in physical memory.</li>
                              <li>• <span className="text-stone-900 font-bold">Auto-Link:</span> The tool updates parent pointers automatically to maintain architecture consistency.</li>
                            </ul>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-end gap-2">
                  <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200">
                    <button onClick={() => setMode('SV32')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${mode === 'SV32' ? 'bg-white text-stone-800 shadow-[0_2px_4px_rgb(0,0,0,0.02)]' : 'text-stone-500 hover:text-stone-700'}`}>Sv32 (32-bit)</button>
                    <button onClick={() => setMode('SV39')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${mode === 'SV39' ? 'bg-white text-stone-800 shadow-[0_2px_4px_rgb(0,0,0,0.02)]' : 'text-stone-500 hover:text-stone-700'}`}>Sv39 (64-bit)</button>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-2">
                  <button onClick={resetToEmpty} className="px-4 py-2 bg-white text-stone-600 border border-stone-200 rounded-lg text-sm font-bold hover:bg-stone-50 hover:border-stone-400 hover:text-stone-900 transition-all shadow-sm" title="Reset to empty state">Clear</button>
                  <button onClick={loadDemo} className="px-4 py-2 bg-white text-stone-600 border border-stone-200 rounded-lg text-sm font-bold hover:bg-stone-50 hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm" title="Load default Page Table example">Load Example</button>
                  <div className="flex shadow-sm">
                    <span className="inline-flex items-center px-3 text-sm text-stone-500 bg-stone-100 border border-r-0 border-stone-300 rounded-l-lg font-mono font-bold">0x</span>
                    <input 
                      type="text" 
                      value={vaInput} 
                      onChange={(e) => setVaInput(e.target.value.replace(/^0x/i, ''))} 
                      className="border border-stone-300 rounded-r-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-stone-300 outline-none w-48 uppercase font-bold" 
                      placeholder="Enter Virtual Address..." 
                    />
                  </div>
                  <button onClick={translateVaToPa} className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-stone-800 shadow-[0_2px_4px_rgb(0,0,0,0.02)] active:scale-95">Translate</button>
                </div>
              </div>
            </header>

            <div className="bg-white px-6 py-4 rounded-[1rem] shadow-sm border border-stone-200 flex flex-col gap-4">
               <div className="flex flex-wrap items-center gap-3">
                 <span className="text-sm font-bold text-stone-500 uppercase tracking-wider">Current Path:</span>
                 {explorerPath.slice(0, currentStep + 1).map((ppn, idx) => {
                     let parentEntry = null;
                     if (idx > 0) {
                         const prevPpn = explorerPath[idx - 1];
                         const prevTable = memoryDB[mode].tables[prevPpn];
                         if (prevTable) {
                             parentEntry = prevTable.find(e => e.ppn === ppn && isPointer(e, idx - 1));
                         }
                     }
                     
                     const tablePa = BigInt(ppn) * 4096n;

                     return (
                         <Fragment key={idx}>
                             {idx > 0 && (
                                 <div className="flex flex-col items-center justify-center gap-1 px-1 min-w-[60px] -mt-2">
                                     {parentEntry && (
                                         <span className="font-mono text-[9px] font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-1" title="Index used in parent table">
                                             Idx: {(() => {
                                                 const val = parentEntry.index;
                                                 if (indexFormat === 'HEX') return `0x${val.toString(16).toUpperCase()}`;
                                                 if (indexFormat === 'BIN') return `0b${val.toString(2).padStart(mode === 'SV32' ? 10 : 9, '0')}`;
                                                 return val.toString(10);
                                             })()}
                                         </span>
                                     )}
                                     <ChevronRight className="w-5 h-5 text-stone-300" />
                                 </div>
                             )}
                             <button
                                 onClick={() => handleBreadcrumbClick(idx)}
                                 className={`px-3 py-2 rounded-xl transition-all shadow-sm flex flex-col border text-left
                                     ${idx === currentStep 
                                        ? 'bg-blue-600 text-white ring-2 ring-blue-200 ring-offset-2 border-blue-600' 
                                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border-stone-200'
                                     }`}
                             >
                                 <div className="flex flex-col">
                                     <div className="flex items-center gap-2 leading-none mb-1.5">
                                         <span className="text-sm font-bold">
                                           {mode === 'SV39' ? `Level ${2 - idx} Table` : `Level ${1 - idx} Table`}
                                         </span>
                                     </div>
                                     <div className={`font-mono text-[10px] flex items-center gap-1.5 leading-none ${idx === currentStep ? 'text-blue-200' : 'text-stone-500'}`}>
                                         <span title="Physical Page Number">PPN: 0x{ppn.toString(16).toUpperCase()}</span>
                                         <span className="opacity-40">|</span>
                                         <span title="Physical Address">PA: 0x{tablePa.toString(16).toUpperCase()}</span>
                                     </div>
                                 </div>
                             </button>
                         </Fragment>
                     );
                 })}
               </div>
               
               {renderDetailsPanel()}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center">
                {renderCurrentTable()}
                {renderPhysicalMemoryVisualizer()}
            </div>

            {relocatingTable && (
               <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
                 <div className="bg-white rounded-2xl shadow-2xl w-[400px] overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200">
                   <div className="bg-indigo-800 p-4 text-white flex justify-between items-center">
                     <h3 className="font-bold flex items-center gap-2"><EditIcon className="w-4 h-4 text-indigo-300" /> Relocate Table</h3>
                   </div>
                   <div className="p-6 space-y-4">
                     <div className="text-sm text-stone-600 leading-relaxed">
                       Moving this table will update the <span className="font-bold text-stone-900">{relocatingTable.currentStep === 0 ? 'Root Pointer' : 'Parent PTE Pointer'}</span> to maintain architecture consistency.
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold text-stone-400 uppercase mb-1">New Physical Address (Hex)</label>
                       <div className="flex shadow-sm">
                         <span className="inline-flex items-center px-3 text-sm text-indigo-600 bg-indigo-50 border border-r-0 border-indigo-200 rounded-l-lg font-mono font-bold">0x</span>
                         <input 
                           type="text" 
                           autoFocus
                           value={relocatingTable.newPaInput}
                           onChange={e => setRelocatingTable({...relocatingTable, newPaInput: e.target.value.replace(/^0x/i, '')})}
                           onKeyDown={e => e.key === 'Enter' && handleRelocateTable()}
                           className="flex-1 border border-indigo-200 rounded-r-lg px-3 py-2.5 font-mono text-lg font-bold text-indigo-900 focus:ring-2 focus:ring-indigo-500 outline-none uppercase"
                           placeholder="Enter Target Address..."
                         />
                       </div>
                     </div>
                     <div className="flex gap-3 pt-2">
                       <button onClick={() => setRelocatingTable(null)} className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-all">Cancel</button>
                       <button onClick={handleRelocateTable} className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md transition-all active:scale-95">Relocate</button>
                     </div>
                   </div>
                 </div>
               </div>
             )}
          </div>
        </div>
      );
    }

    
  
export default App;
