# Multimodal research evidence

Treat images, figures, audio, and video as sources requiring provenance and
precise locations. These are project extraction conventions; modality support,
preprocessing, and limits depend on the actual model and API.

## Capture a source record

Record original file checksum, rights/consent, source, capture date if known,
and any crop, resize, OCR, transcription, resampling, or frame selection.
Retain the original when permitted. Cite page/figure and bounding region for
images; timestamps and speaker labels for audio; timestamp/frame selection
for video. Describe inaccessible or unreadable content explicitly.

## Task patterns

**Image description:** "For image A, list directly visible features and their
locations. Separate observation from interpretation. Mark unreadable text."

**Diagram extraction:** "For Figure 2, extract nodes, arrows, labels, units,
and legend. Return an edge table with locations. Flag ambiguous connections;
do not infer direction from the paper's title."

**Audio analysis:** "For the consented clip, transcribe with timestamps and
uncertain spans. Use anonymous speaker labels. Separate transcript text from
thematic interpretation and check ambiguous segments against the audio."

**Video summary:** "Use the supplied sampling schedule. Report events with
observed timestamps and frame IDs. Describe what could occur between sampled
frames as unknown. Link each observation to an inspected frame or audio span."

For multiple inputs, label them explicitly and ask for a structured comparison.
Record absences only within the inspected region or time interval. For a plotted
quantity, use the underlying numerical data when available; digitization is
an estimate and should retain its calibration and error assumptions.

## Model and API adaptation

For a hosted provider or an open-weight model, inspect its official
model card and processor documentation before assuming support for images,
audio, or video. Record model revision, processor, image dimensions, sampling,
and serialization. A sequence of sampled images does not establish native
video support. Do not generalize one model's tokenization or attention design
to all multimodal systems or publish unsupported cross-provider rankings.

## Verify

Inspect the original alongside extracted values. Check axes, units, negations,
legends, speaker changes, and time alignment. Use a second human pass for
critical measurements when the protocol calls for it. Record uncertainty and
modality-specific missingness. Apply [injection defenses](research-security.md)
to text embedded in images and transcripts as well as ordinary documents.
