# Drone Flight Controller — Product Requirements

## Overview

Educational flight controller for small racing/freestyle drones (3-5 inch props).

**Target**: Hobbyists, students, first-time drone builders.

## Core Requirements

### Functionality
- 6-axis IMU (gyro + accel)
- ESC control (4x PWM outputs, Dshot-capable)
- RC receiver input (SBUS/CRSF)
- USB interface for configuration
- Status LED indicators
- Buzzer for lost model alarm

### Performance
- IMU sample rate: ≥8kHz
- Control loop: ≥4kHz
- Latency: <2ms (RC input → ESC output)

### Physical
- Board size: 30.5mm × 30.5mm (standard FC stack size)
- Mounting: M3 holes at 25.5mm spacing
- Weight: <8g
- Operating voltage: 5V (from PDB/ESC)

### Environmental
- Operating temp: -20°C to +85°C
- Vibration: Sustained 20G, shock 100G
- Water resistance: Conformal coating capable

## Constraints

### Budget
- Target BOM cost: <£15 @ 100 units
- Total landed cost: <£30 retail

### MCU Selection
- STM32F4 or F7 family (ARM Cortex-M4/M7)
- ≥256KB Flash, ≥128KB RAM
- Hardware FPU required
- USB OTG peripheral

### Sensors
- IMU: ICM-42688-P or BMI270 (SPI)
- Barometer: Optional (future)

### Power
- Input: 5V ±5%
- Consumption: <200mA typical
- 3.3V LDO for peripherals

### Firmware Compatibility
- Must run Betaflight or similar open-source FC firmware
- Pin mapping must follow Betaflight conventions

## Success Criteria

1. Works with standard drone hardware (ESCs, RX, etc.)
2. Passes basic flight test (stable hover)
3. BOM cost under target
4. Can be hand-soldered (or assembled at JLCPCB)
5. Firmware flashes via USB DFU

## Non-Requirements (v1)
- No GPS
- No SD card logging
- No video TX control
- No onboard radio
- No wireless configuration

## Reference Designs
- SpeedyBee F405 V3
- Mamba F722
- JHEMCU GHF411AIO

## Timeline
- Schematic: 1 week
- PCB layout: 1 week
- Manufacturing: 2 weeks
- Bring-up: 1 week

## Risks
- IMU availability/cost
- STM32 supply (consider alternates)
- Betaflight pin mapping constraints
