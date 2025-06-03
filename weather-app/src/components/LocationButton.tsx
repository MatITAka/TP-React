type LocationButtonProps = {
    onClick: () => void;
    disabled?: boolean;
};

const LocationButton = ({ onClick, disabled }: LocationButtonProps) => (
    <button
        className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
        onClick={onClick}
        disabled={disabled}
    >
        Autoriser la localisation
    </button>
);

export default LocationButton;